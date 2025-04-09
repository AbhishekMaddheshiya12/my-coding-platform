import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import image from "../assets/lean-dev.png";
import jsImage from "../assets/js.jpg";
import javaImage from "../assets/java.png";
import downloadImage from "../assets/download.jpeg";
import cppImage from "../assets/OIP.jpg";
import NavBar from "../components/NavBar";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";


function LandingPage() {
  const [islogin, setIsLogin] = useState(false);

  return (
    <Box height={"100vh"}>
      <NavBar></NavBar>

        <div
          style={{
            display:"flex",
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,rgb(90, 103, 130) 40%,rgb(255, 255, 255) 100%)",
            height: 'calc(100vh - 64px)'
            }}
          >
            {islogin ? (
            <Login setIsLogin={setIsLogin}></Login>
          ) : (
            <Signup setIsLogin={setIsLogin}></Signup>
          )}
        </div>
    </Box>
  );
}

export default LandingPage;
