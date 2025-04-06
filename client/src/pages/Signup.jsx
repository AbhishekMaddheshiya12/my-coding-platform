import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/auth';

function Signup({setIsLogin}) {
  const dispatch = useDispatch();
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const submitHandler = async(e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers:{'Content-Type' : 'application/json'}
    }

    try{
      const data = await axios.post('http://localhost:4000/user/signup',{username:userName,email,password},config);
      console.log(data);
      dispatch(userExist(true));
    }catch(error){
      console.log(error);
    }
  }
  const handleChange = () =>{
    setIsLogin(true);
  }

  return (
    <Box sx={{width:'25%',margin:'auto'}}>
        <Typography variant='h3' sx={{fontFamily: "cursive",fontWeight: 600,textAlign:'center'}}>WelCome</Typography>
        <Typography variant='h3' sx={{fontFamily: "cursive",fontWeight: 600,textAlign:'center'}}>To CodeWorld</Typography>        
        <form style={{display:'flex',flexDirection:'column', padding:24}} onSubmit={submitHandler}>
          <TextField label = "Username" variant='standard' color='black' value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <TextField label = "Email" variant = "standard" color='black'value={email} type='email' onChange={(e) => setEmail(e.target.value)}/>
          <TextField label = "Password" variant='standard' color='black' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button variant='contained' sx={{backgroundColor:'black', mt:2}} type='submit'>Register</Button>
        </form>
        <Typography sx={{ fontFamily: "cursive", fontWeight: 600,textAlign:'center' }}>Already have an account?</Typography>
        <Button variant='standard' onClick={handleChange} sx={{margin:'0 auto' ,display:'block'}}>Login</Button>
    </Box>
  )
}

export default Signup