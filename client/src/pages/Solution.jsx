import React, { useState } from 'react';
import ProblemStatement from '../components/ProblemStatement';
import PlayGround from '../components/PlayGround';
import Split from 'react-split';
import '../components/split.css';
import NavBar from '../components/NavBar';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
import problems from '../fakeData/problems.js';
import Submission from '../components/Submission.jsx';

function Solution() {
  const {problemId} = useParams();
  const [isSubmission, setIsSubmission] = useState(false);
  const problemdata = problems.find(problem => problem.id == problemId);

  const tesTCases = problemdata.testCases;
  
  return (
    <Box>
      <NavBar></NavBar>
      <Split
      className="split"
      sizes={[50, 50]}
      minSize={200}  
      gutterSize={10} 
      direction="horizontal" 
      cursor="col-resize"    
    >
      <div className="pane">
        {isSubmission ? (<Submission problemId = {problemId} setIsSubmission = {setIsSubmission}></Submission>):(<ProblemStatement problemData={problemdata} setIsSubmission = {setIsSubmission} />)}
      </div>
      <div className="pane">
        <PlayGround tesTCases = {tesTCases} problemId = {problemId} />
      </div>
    </Split>
    </Box>
  );
}

export default Solution;
