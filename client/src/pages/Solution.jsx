import React, { useState } from 'react';
import ProblemStatement from '../components/ProblemStatement';
import PlayGround from '../components/PlayGround';
import Split from 'react-split';
import '../components/split.css'; // Ensure this path is correct
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
  // console.log(tesTCases);
  
  return (
    <Box>
      <NavBar></NavBar>
      <Split
      className="split"
      sizes={[50, 50]} // Initial sizes of the two panes
      minSize={200}    // Minimum size for each pane
      gutterSize={10}  // Size of the gutter
      direction="horizontal" // Horizontal split
      cursor="col-resize"    // Cursor style during drag
    >
      <div className="pane">
        {isSubmission ? (<Submission problemId = {problemId} setIsSubmission = {setIsSubmission}></Submission>):(<ProblemStatement problemData={problemdata} setIsSubmission = {setIsSubmission} />)}
      </div>
      <div className="pane">
        <PlayGround tesTCases = {tesTCases} />
      </div>
    </Split>
    </Box>
  );
}

export default Solution;
