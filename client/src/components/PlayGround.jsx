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
import { useSelector } from "react-redux";

function PlayGround({ tesTCases }) {
  const { problemId } = useParams();

  const userId = useSelector(state => state.auth.user._id);

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    return savedLanguage || "javascript";
  });

  const [code, setCode] = useState("");
  const [failed, setFailed] = useState(false);
  const [testCases, setTestCases] = useState(tesTCases);
  const [story,setStory] = useState("");

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


  const data = {
    language_id:language_id[language],
    base64EncodedCode:base64EncodedCode,
    problemId:problemId
  }

  const handleRunCode = async() => {
    const config = {
      withCredentials: true,
      header: { "Content-Type": "application/json" },
    }
    try{
      const res = await axios.post('http://localhost:4000/user/getSubmission',data,config);
      console.log(res);
      const {updatedTestCases,results,hasFailure,failureStatus} = res.data;

      setTestCases(updatedTestCases);
      setFailed(hasFailure);
      setStory(failureStatus);

      return results;
    }catch(error){
      console.log(error);
    }
  }

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
      console.log("Story after handleRunCode:", story); 
  
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
              <Typography sx={{color:getColor(story)}}>{story}</Typography>
            </Box>
          </Box>
        </Box>
      </Split>
    </div>
  );
}

export default PlayGround;
