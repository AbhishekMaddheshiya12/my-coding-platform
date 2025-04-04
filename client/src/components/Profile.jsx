import { Avatar, Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import problems from "../fakeData/problems";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Profile() {
  const dispatch = useDispatch();
  
  const userId = useSelector(state => state.auth.user._id);
  const [userData,setUserData] = useState({});
    useEffect(() => {
        const fetchUserDetails = async () => {
          try{
            const config = {
              withCredentials: true,
              header: { "Content-Type": "application/json" },
            }
            const user = await axios.get(`http://localhost:4000/user/getUserDetails/${userId}`,config);
            console.log(user);
            setUserData(user.data.user);
          }catch(error){
            console.log(error);
          }
        }
        fetchUserDetails();
    },[])

    const problemSolved = userData.problemSolved;
    const solvedChart = [0,0,0]
    const ProblemSolved = [];
    problemSolved?.forEach((problemId) => {
      const prob = problems.find((problem) => problem.id === problemId);
      ProblemSolved.push(prob);
      if(prob.difficulty === "Easy"){
        solvedChart[0] = solvedChart[0] + 1;
      }else if(prob.difficulty === "Medium"){
        solvedChart[1] = solvedChart[1] + 1;
      }else{
        solvedChart[2] = solvedChart[2] + 1;
      }
    })

  const chartData = {
    labels: ["Difficulty"],
    datasets: [
      {
        label: "Easy",
        data: solvedChart[0],
        backgroundColor: "#4caf50", // Green
        borderColor: "#388e3c",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Medium",
        data: solvedChart[1],
        backgroundColor: "#ffca28", // Yellow
        borderColor: "#ffb300",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Hard",
        data: solvedChart[2],
        backgroundColor: "#ef5350", // Red
        borderColor: "#d32f2f",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Problems Solved",
        color: "#fff",
        font: { size: 20, weight: "bold" },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
          color: "#fff",
          font: { size: 14 },
        },
        ticks: { color: "#fff" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
    },
  };

  return (
    <Paper
      sx={{
        mt: 2,
        bgcolor: "#2c3e5d",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      {/* Avatar Section */}
      <Box
        sx={{
          bgcolor: "#1a2b4a",
          p: 3,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            border: "3px solid #fff",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        />
        <Typography variant="h6" color="#fff" sx={{ mt: 2 }}>
          {userData.username}
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {userData.email}
        </Typography>
      </Box>

      {/* Chart Section */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ height: "50vh" }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </Box>
    </Paper>
  );
}

export default Profile;