import { Avatar, Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function User() {
  const [userData,setUser] = useState({});
  const userId = useSelector(state => state.auth.user._id);
  const avatarUrl = useSelector(state => state.auth.user.avatarUrl);
  useEffect(() => {
    const fetchUser = async() => {
      try{
        const config = {
          withCredentials: true,
          header: { "Content-Type": "application/json" },
        }
        const user = await axios.get(`http://localhost:4000/user/getUserDetails/${userId}`,config);
        if(!user){
          console.log("No user found");
        }
        setUser(user.data.user);
      }catch(error){
        console.log(error);
      }
    }

    fetchUser();
  },[userId])

  // console.log(userData);
  return (
    <Box>
        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10%'}}>
                <Avatar sx={{width:'160px',height:'160px',border:'4px solid white',transition:'transform 0.3s ease-in-out','&:hover':{transform:'scale(1.1)'}}} src={avatarUrl}></Avatar>
            </Box>
            <Box mt={3}>
              <Typography sx={{fontSize:'20px',color:'white',textAlign:'center'}}>{userData.username}</Typography>
              <Typography sx={{fontSize:'15px',color:'white',textAlign:'center'}}>{userData.email}</Typography>
              <hr style={{color:'white',width:'80%',margin:'auto',marginTop:'10px',marginBottom:'10px'}}></hr>
              <Typography sx={{fontSize:'15px',color:'white',textAlign:'center'}}></Typography>
              <Typography sx={{fontSize:'15px',color:'white',textAlign:'center'}}>Total Solved : {userData.problemSolved?.length}</Typography>
              <Typography sx={{fontSize:'15px',color:'white',marginLeft:'10%',marginTop:'10px',display:'flex',gap:'10px'}}>Languages :</Typography>
              <ul style={{listStyleType:'none',color:'white',display:'flex',flexDirection:'column',justifyContent:'center',gap:'10px',marginLeft:'20%',marginTop:'10px'}}>
                <li style={{backgroundColor:'#2c3e5d',padding:'5px',borderRadius:'50px',width:'100px',textAlign:'center'}}>Python</li>
                <li style={{backgroundColor:'#2c3e5d',padding:'5px',borderRadius:'50px',width:'100px',textAlign:'center'}}>C++</li>
                <li style={{backgroundColor:'#2c3e5d',padding:'5px',borderRadius:'50px',width:'100px',textAlign:'center'}}>Java</li>
              </ul>
            </Box>
    </Box>
  )
}

export default memo(User)