import React, { memo } from 'react'
import moment from 'moment';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const  MessageComponent = ({message,sender,sendername,date})  => {
  const userId = useSelector(state => state.auth.user._id);
  const sameSender = sender !== userId;
  const timeAgo = moment(date).fromNow();
 return (
    <div style={{backgroundColor: sameSender ? '#d6d6d6' : 'rgb(152, 151, 154)',padding:'5px',margin:'5px',borderRadius:'10px',width:'fit-content',alignSelf:sameSender?'flex-start':'flex-end',}}>
        {
          sameSender && (
            <Typography variant='caption' color='white'>{sendername}</Typography>
          )
        }
        {message && (<Typography>{message}</Typography>)}
        
        <Typography variant="caption" color={"text.secondary"} sx={{float:'right'}}>
            {timeAgo}
      </Typography>
    </div>
  )
}

export default memo(MessageComponent)