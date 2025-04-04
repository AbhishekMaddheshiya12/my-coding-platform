import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { green, red, yellow } from '@mui/material/colors';
import YouTubeIcon from '@mui/icons-material/YouTube';
import problems from '../fakeData/problems.js'
import {Link} from './StyledComp.jsx';

function ProblemTable() {
  return (
    <tbody style={{backgroundColor: '#2C3E5D',borderRadius: '12px'}}>
      {problems.map((problem) => {
        const difficultyColor = problem.difficulty == 'Easy' ? green[500] : problem.difficulty == 'Medium' ? yellow[600] : red[500];
        return (
          <tr key={problem.id}>
            <td style={{ padding: '9px', textAlign: 'center' }}>
              <CheckIcon sx={{ color: green[500] }} />
            </td>
            <td style={{ paddingLeft: '12px', textAlign: 'left' }}>
              <Link to={`/problems/${problem.id}`}>{problem.id} . {problem.title}</Link>
            </td>
            <td style={{ padding: '12px', textAlign: 'center', color: difficultyColor }}>{problem.difficulty}</td>
            <td style={{ padding: '12px', textAlign: 'center' }}>{problem.category}</td>
            <td style={{ padding: '8px', textAlign: 'center' }}>{
                problem.videoId == "" ? 'Coming Soon ...' : <a href={`https://www.youtube.com/watch?v=${problem.videoId}`}><YouTubeIcon sx={{ color: 'red'}} /></a>
                }</td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default ProblemTable;
