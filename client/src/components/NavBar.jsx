import React from 'react';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import image from '../assets/Logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/auth';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async() => {
    try{
      const data = await axios.get('http://localhost:4000/user/logout',{withCredentials: true});
      console.log(data);
      if(data.data.success){
        dispatch(userExist(false));
        navigate('/');
      }
    }catch(error){
      console.log(error);
    }
  };
  return (
    <Box sx={{position:'sticky'}}>
      <Paper elevation={24} sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '5px 10px', backgroundColor:"white"}}>
        <Box sx={{ fontWeight: 'bold', fontSize: '1.5rem',position:'sticky' }}>
          <img width={30} src={image}></img>
        </Box>

        <Box sx={{display: 'flex',gap: '10px',}}>
          <Button variant='standard' style={{ color: 'black', fontWeight: 'bold',fontFamily: 'Shippori Antique' }} onClick={() => navigate('/home')}>Problems</Button>
          <Button variant='standard' style={{ color: 'black', fontWeight: 'bold',fontFamily: 'Shippori Antique' }} onClick={() => navigate('/discuss')}>Discuss</Button>
          <Button variant='standard' style={{ color: 'black', fontWeight: 'bold',fontFamily: 'Shippori Antique' }} onClick={() => navigate('/aboutUs')}>About Us</Button>
          <Button variant='standard' style={{ color: 'black', fontWeight: 'bold',fontFamily: 'Shippori Antique' }} onClick={handleLogOut}>Logout</Button>
          <IconButton onClick={() => navigate('/profile')}>
            <AccountCircleIcon style={{color:'black'}}></AccountCircleIcon>
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default NavBar;
