import React, { memo } from 'react'
import moment from 'moment';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const  MessageComponent = ({message,sender,sendername})  => {
  const userId = useSelector(state => state.auth.user._id);
  console.log(userId);
  const sameSender = sender !== userId;
  // const timeAgo = moment(createdAt).fromNow();
 return (
    <div style={{backgroundColor: sameSender ? '#d6d6d6' : '#2694ab',padding:'5px',margin:'5px',borderRadius:'10px',width:'fit-content',alignSelf:sameSender?'flex-start':'flex-end',}}>
        {
          sameSender && (
            <Typography variant='caption' color='white'>{sendername}</Typography>
          )
        }
        {message && (<Typography>{message}</Typography>)}
        
        <Typography variant="caption" color={"text.secondary"}>
            {/* {timeAgo} */}
      </Typography>
    </div>
  )
}

export default memo(MessageComponent)