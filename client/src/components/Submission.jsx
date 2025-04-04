import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Submission(data) {
  const [submissionData, setSubmissionData] = useState([]);
  const { problemId, setIsSubmission } = data;
  const userId = useSelector(state => state.auth.user._id);
  const getSubmission = async () => {
    try {
      const config = {
        withCredentials: true,
        header: { "Content-Type": "application/json" },
      };
      const { data } = await axios.get(
        `http://localhost:4000/user/getSubmission/${userId}/${problemId}`,
        config
      );
      setSubmissionData(data.submission);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubmission();
  }, []);

  return (
    <Box sx={{height:`calc(100vh - 64px)`,overflowY:'scroll'}}>
      <div style={{ display: "flex", margin: 10 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2c3e5d",
            width: "6rem",
            height: "2rem",
            fontSize: 12,
            marginRight: 2,
          }}
          onClick={() => setIsSubmission(false)}
        >
          Description
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2c3e5d",
            width: "6rem",
            height: "2rem",
            fontSize: 12,
            marginRight: 2,
          }}
        >
          Solution
        </Button>
        <Button
          varient="contained"
          sx={{
            backgroundColor: "#2c3e5d",
            width: "6rem",
            height: "2rem",
            fontSize: 12,
            color: "white",
          }}
          onClick={() => setIsSubmission(true)}
        >
          Submission
        </Button>
      </div>

      {submissionData.map((submission,index) => {
        const color = submission.attemptTypes === "Accepted" ? "green" : "red";
        const date = new Date(submission.lastAttempt);
        return (
          <Box key={submission._id} style={{ display: "flex", margin: 10 }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: 2,
                width: "100%",
                justifyContent: "space-between",
                backgroundColor: "#2c3e5d",
                color: "white",
              }}
            >
              <Typography>{index++}</Typography>
              <Typography color={color}>{submission.attemptTypes}</Typography>
              <Typography>{date.toLocaleString()}</Typography>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}

export default Submission;
