import React, { useState, useEffect } from "react";
import NewNav from "./NewNav";
import Split from "react-split";
import "../components/split.css";
import { Box, Button, Paper, Typography } from "@mui/material";
import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { useParams } from "react-router";

function PlayGround({ tesTCases }) {
  const { problemId } = useParams();

  const userId = "67aeedb92a22d7380ae039c9";

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    return savedLanguage || "javascript";
  });

  const [code, setCode] = useState("");
  const [failed, setFailed] = useState(false);
  const [testCases, setTestCases] = useState(tesTCases);
  const [story,setStory] = useState("Accepted");

  const monaco = useMonaco();

  useEffect(() => {
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  useEffect(() => {
    if (monaco) {
      console.log("Monaco instance loaded:", monaco);

      monaco.editor.defineTheme("custom-light", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "888888", fontStyle: "italic" },
          { token: "keyword", foreground: "ff9d00" },
        ],
        colors: {
          "editor.background": "#121212",
          "editor.foreground": "#ffffff",
          "editor.lineHighlightBackground": "#2a2a2a",
        },
      });

      monaco.editor.setTheme("custom-dark");
    }
  }, [monaco]);

  const handleEditorDidMount = (editor, monacoInstance) => {
    console.log("Editor Mounted:", editor);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const language_id = {
    c: 1,
    cpp: 2,
    javascript: 9,
    java: 3,
    python: 4,
  };

  // This block of code is taken from the chatgpt
  const encodeBase64 = (str) => {
    return btoa(
      new TextEncoder()
        .encode(str)
        .reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  const base64EncodedCode = encodeBase64(code);

  useEffect(() => {
    setFailed(false);
  },[code])

  // The referance is taken from the documentation of judge0 extra CE
  const handleRunCode = async () => {
    try {
      const submissions = testCases.map((test) => ({
        language_id: language_id[language],
        source_code: base64EncodedCode,
        stdin: encodeBase64(test.input),
        expected_output: encodeBase64(test.expectedOutput),
        callback_url: "https://localhost:4000/user/judge0-callback",
      }));

      console.log("Submissions:", submissions); // The line is for the debugging the submisson after the testcase mapping

      const options = {
        method: "POST",
        url: "https://judge0-extra-ce.p.rapidapi.com/submissions/batch",
        params: {
          base64_encoded: "true",
          wait: "false",
          fields: "*",
        },
        headers: {
          'x-rapidapi-key': 'bb2e866215msh150f4914a869517p1f7dc2jsn6c612857138c',
          "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: { submissions },
      };

      const response = await axios.request(options);
      console.log("Batch Submission Response:", response.data);

      if (response.data) {
        const tokens = response.data.map((submission) => submission.token); //I was getting error here meanwhile i was not doing that and passes it dorectly
        const finalResult = await getSubmissionResult(tokens);
        return finalResult;
        console.log(finalResult);
      }
      console.log("hello handlesRunCode");
      return [];
    } catch (error) {
      console.error("Error in handleRunCode:", error);
    }
  };

  const getSubmissionResult = async (tokens) => {
    const options = {
      method: "GET",
      url: "https://judge0-extra-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokens.join(","), // Join tokens with commas
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        'x-rapidapi-key': 'bb2e866215msh150f4914a869517p1f7dc2jsn6c612857138c',
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
      },
    };
  
    try {
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
            stdout: atob(submission.stdout || ""), // Decode base64 stdout
            stderr: atob(submission.stderr || ""), // Decode base64 stderr
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
        const retryResults = await getSubmissionResult(processingTokens); // Recursively retry
        results.push(...retryResults); // Merge retry results with current results
      }
  
      // If all submissions are processed, update the test cases and state
      if (processingTokens.length === 0) {
        console.log("Final Results:", results);
  
        // Update testCases with results
        setTestCases((prevTestCases) =>
          prevTestCases.map((testCase, index) => ({
            ...testCase,
            status: results[index]?.status || "Unknown",
          }))
        );
  
        // Update failed and story state if any submission failed
        if (hasFailure) {
          setFailed(true);
          setStory(failureStatus);
        }
      }
  
      return results;
    } catch (error) {
      console.error("Error fetching batch results:", error);
      return []; 
    }
  };

  const setAttempt = async () => {
    try {
     const finalResult = await handleRunCode();
     console.log(finalResult);
     let story = "Accepted";
     finalResult.some((result) => {
       if (result.status !== "Accepted") {
          story = result.status;
       }
     })
      console.log("Story after handleRunCode:", story); // Now this should log the updated story
  
      const config = {
        withCredentials: true,
        header: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        "http://localhost:4000/user/judge0-callback",
        { story, problemId, userId },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubmission = async () =>{
    try{
      const config = {
        withCredentials: true,
        header: { "Content-Type": "application/json" },
      };
      const data = await axios.get('http://localhost:4000/user/getSubmission',{userId,problemId},config);
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }

  const getColor = (status) => {
    switch (status) {
      case "Accepted":
        return "green";
      case "Wrong Answer":
        return "red";
      case "Processing":
        return "yellow";
      case "Runtime Error":
        return "red";
      case "Time Limit Exceeded":
        return "red";
      case "Memory Limit Exceeded":
        return "red";
      default:
        return "grey";
    }
  };

  const firstThree = testCases.slice(0, 3);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "",
        height: `calc(100vh - 64px)`,
      }}
    >
      <NewNav setLanguage={setLanguage} language={language} />
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={handleRunCode}>Run Code</Button>
        <Button onClick={setAttempt}>Submit</Button>
      </Box>

      <Split
        style={{ height: `calc(100vh)` }}
        direction="vertical"
        sizes={[60, 40]}
      >
        <Box sx={{ width: "100%", height: "60%" }}>
          <Editor
            height="100%"
            language={language}
            defaultValue="// Write your code here"
            onMount={handleEditorDidMount}
            theme="custom-dark"
            onChange={handleCodeChange}
          />
        </Box>
        <Box
          sx={{
            height: "40%",
            color: "white",
            padding: "10px",
            borderRadius: 5,
          }}
        >
          <Paper
            sx={{
              height: "10",
              backgroundColor: "#2c3e5d",
              display: "flex",
              lineHeight: 1.2,
            }}
          >
            <CheckBoxIcon></CheckBoxIcon>
            <Typography
              fontWeight={400}
              color="text.primary"
              fontSize="1.2rem"
              textAlign="center"
            >
              Testcases:
            </Typography>
          </Paper>
          <Box display={"flex"} gap={3} mt={3}>
            {firstThree.map((test) => (
              <Box
                key={test.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: getColor(test.status),
                }}
              >
                <TaskAltRoundedIcon />
                <Typography>{`Case ${test.id}`}</Typography>
              </Box>
            ))}
            <Box>
              {failed ? (
                <Typography color="red">Failed</Typography>
              ) : (
                <Typography color="green">Success</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Split>
    </div>
  );
}

export default PlayGround;
