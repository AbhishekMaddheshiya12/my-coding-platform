import axios from "axios";
import problems from "../fakeData/problems.js";

const encodeBase64 = (str) => {
  return btoa(
    new TextEncoder()
      .encode(str)
      .reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
};

const getSubmissionResult = async (tokens) => {
  console.log(tokens);
  try {
    const options = {
      method: "GET",
      url: "https://judge0-extra-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokens?.join(","),
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "bb2e866215msh150f4914a869517p1f7dc2jsn6c612857138c",
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const { submissions } = response.data;

    if (!submissions || submissions.length === 0) {
      console.error("No submissions returned.");
      return [];
    }
    const results = [];
    const processingTokens = [];
    let hasFailure = false;
    let failureStatus = "Accepted";

    submissions.forEach((submission, index) => {
      if (!submission || submission.status.description === "Processing") {
        processingTokens.push(tokens[index]);
      } else {
        const status = submission.status.description;
        results.push({
          id: index + 1,
          status,
          stdout: atob(submission.stdout || ""),
          stderr: atob(submission.stderr || ""),
        });

        if (status !== "Accepted" && !hasFailure) {
          hasFailure = true;
          failureStatus = status;
        }
      }
    });

    console.log("Processed Results:", results);

    if (processingTokens.length > 0) {
      console.log(
        `Retrying for ${processingTokens.length} submissions still processing...`
      );
      const retryResults = await getSubmissionResult(processingTokens);
      results.push(...(retryResults.results || []));

      if (retryResults.hasFailure && !hasFailure) {
        hasFailure = true;
        failureStatus = retryResults.failureStatus;
      }
    }

    console.log("Final Results:", results);
    return {
      results,
      hasFailure,
      failureStatus,
    };
  } catch (error) {
    console.error("Error fetching batch results:" + error);
    return {
      results: [],
      hasFailure: true,
      failureStatus: "Failed to fetch",
    };
  }
};

const judgeSubmission = async (req, res) => {
  try {
    const { language_id, base64EncodedCode, problemId } = req.body;
    if (!language_id || !base64EncodedCode || !problemId) {
      return res.status(400).json({
        success: false,
        message: "Not enough data",
      });
    }
    const problemdata = problems.find((problem) => problem.id == problemId);
    const testCases = problemdata.testCases;

    const submissions = testCases.map((test) => ({
      language_id: language_id,
      source_code: base64EncodedCode,
      stdin: encodeBase64(test.input),
      expected_output: encodeBase64(test.expectedOutput),
      callback_url: "https://localhost:4000/user/judge0-callback",
    }));

    const options = {
      method: "POST",
      url: "https://judge0-extra-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: true,
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "bb2e866215msh150f4914a869517p1f7dc2jsn6c612857138c",
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: { submissions },
    };

    const response = await axios.request(options);
    console.log("Batch Submission Response:", response.data);

    if (response.data) {
      const tokens = response.data.map((submission) => submission.token);
      console.log(tokens);
      const finalResult = await getSubmissionResult(tokens);
      const { results, hasFailure, failureStatus } = finalResult;
      console.log(finalResult);
      console.log("Your father is checking your report" + results);

      const updatedTestCases = testCases.map((testCase, index) => ({
        ...testCase,
        status: results[index]?.status || "Unknown",
        stdout: results[index]?.stdout || "",
      }));

      return res.status(200).json({
        success: true,
        updatedTestCases,
        results,
        hasFailure,
        failureStatus,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Gadbad yha hai chutiye",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Kuch to gadbad hai daya",
    });
  }
};

export { judgeSubmission };
