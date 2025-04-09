import {
  Avatar,
  Box,
  colors,
  Divider,
  Grid2,
  Icon,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Bar, Chart, Line } from "react-chartjs-2";
import { Link } from "../components/StyledComp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";
import { use } from "react";
import problems from "../fakeData/problems";
import { useSelector } from "react-redux";
import { VisuallyHiddenInput } from "../components/helper/Styled";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Profiles() {
  const userId = useSelector((state) => state.auth.user._id);
  const avatarUrl = useSelector((state) => state.auth.user.avatarUrl);
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(avatarUrl);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          headesr: { "Content-Type": "application/json" },
        };
        const user = await axios.get(
          `http://localhost:4000/user/getUserDetails/${userId}`,
          config
        );
        console.log(user);
        setUserData(user.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);
  const dateStr = userData.createdAt;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString();
  const handleAvatar = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    try{
      const config = {
        withCredentials: true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }

      const result = await axios.post("http://localhost:4000/user/upload-avatar",formData,config);
      console.log(result);
      if(result.data.success){
        console.log(result.data.avatarUrl);
        setAvatar(result.data.avatarUrl);
      }
    }catch(error){
      console.log("Error uploading avatar:", error);
    }
  };

  const attemptData = userData.attempts;
  const daysAgo = (days) => {
    let d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split("T")[0];
  };

  const last7Days = [...Array(7)].map((_, i) => daysAgo(6 - i));

  const attemptByDate = {};

  attemptData?.forEach(({ lastAttempt }) => {
    const date = new Date(lastAttempt).toISOString().split("T")[0];
    if (last7Days.includes(date)) {
      attemptByDate[date] = (attemptByDate[date] || 0) + 1;
    }
  });

  const chartData = last7Days.map((date) => attemptByDate[date] || 0);

  const problemSolved = userData.problemSolved;
  const solvedChart = [0, 0, 0];
  const ProblemSolved = [];
  problemSolved?.forEach((problemId) => {
    const prob = problems.find((problem) => problem.id === problemId);
    ProblemSolved.push(prob);
    if (prob.difficulty === "Easy") {
      solvedChart[0] = solvedChart[0] + 1;
    } else if (prob.difficulty === "Medium") {
      solvedChart[1] = solvedChart[1] + 1;
    } else {
      solvedChart[2] = solvedChart[2] + 1;
    }
  });

  // barGraph
  const barData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Problems Solved",
        data: solvedChart,
        backgroundColor: ["#4caf50", "#ffca28", "#ef5350"],
        borderColor: ["#388e3c", "#ffb300", "#d32f2f"],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };
  const lineData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Problems attempted",
        data: chartData,
        fill: false,
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff", font: { size: 14 } },
      },
      title: {
        display: true,
        color: "#fff",
        font: { size: 18, weight: "bold" },
        padding: { bottom: 20 },
      },
      tooltip: { backgroundColor: "#1a2b4a", cornerRadius: 4 },
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
    animation: { duration: 1000, easing: "easeOutQuart" },
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Box>
        <NavBar></NavBar>
      </Box>
      <Grid2 container spacing={3} sx={{ margin: "auto", marginTop: "10px" }}>
        <Grid2
          bgcolor={"#1A2B4A"}
          size={{ xs: 6, md: 3 }}
          sx={{
            height: "calc(100vh - 64px)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.015)" },
          }}
        >
          {/* profile */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10%",
            }}
          >
            <form>
            <Stack position="relative" width="10rem" margin="auto">
                <Avatar sx={{ width: "10rem", height: "10rem", objectFit: 'contain' }} src={avatar}></Avatar>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    backgroundColor: "rgba(0 ,0,0,0.5)",
                    ":hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <CameraAltIcon />
                  <VisuallyHiddenInput type="file" onChange={handleAvatar}></VisuallyHiddenInput>
                </IconButton>
              </Stack>
            </form>
          </Box>
          <Box mt={3}>
            <Typography
              sx={{ fontSize: "20px", color: "white", textAlign: "center" }}
            >
              {userData.username}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", color: "white", textAlign: "center" }}
            >
              {userData.email}
            </Typography>
            <hr
              style={{
                color: "white",
                width: "80%",
                margin: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            ></hr>
            <Typography
              sx={{ fontSize: "15px", color: "white", textAlign: "center" }}
            >
              Joined: {formattedDate}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", color: "white", textAlign: "center" }}
            >
              Total Solved : {userData.problemSolved?.length}
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                color: "white",
                marginLeft: "10%",
                marginTop: "10px",
                display: "flex",
                gap: "10px",
              }}
            >
              Languages :
            </Typography>
            <ul
              style={{
                listStyleType: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                marginLeft: "20%",
                marginTop: "10px",
              }}
            >
              <li
                style={{
                  backgroundColor: "#2c3e5d",
                  padding: "5px",
                  borderRadius: "50px",
                  width: "100px",
                  textAlign: "center",
                }}
              >
                Python
              </li>
              <li
                style={{
                  backgroundColor: "#2c3e5d",
                  padding: "5px",
                  borderRadius: "50px",
                  width: "100px",
                  textAlign: "center",
                }}
              >
                C++
              </li>
              <li
                style={{
                  backgroundColor: "#2c3e5d",
                  padding: "5px",
                  borderRadius: "50px",
                  width: "100px",
                  textAlign: "center",
                }}
              >
                Java
              </li>
            </ul>
          </Box>
        </Grid2>
        <Grid2
          size={{ xs: 6, md: 9 }}
          sx={{
            height: "calc(100vh - 64px)",
            overflowY: "scroll",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box>
            <Paper
              sx={{
                bgcolor: "#2c3e5d",
                borderRadius: 3,
                p: 3,
                mb: 3,
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bar data={barData} options={chartOptions}></Bar>
              </Box>
            </Paper>
            <Paper
              sx={{
                bgcolor: "#2c3e5d",
                borderRadius: 3,
                p: 3,
                mb: 3,
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Line options={chartOptions} data={lineData}></Line>
              </Box>
            </Paper>
            <Box>
              <Typography>Problem Solved:</Typography>
              <hr></hr>
              {ProblemSolved.map((problem) => {
                return (
                  <Link key={problem.id} to={`/problems/${problem.id}`}>
                    <Paper
                      sx={{
                        backgroundColor: "#2c3e5d",
                        padding: 2,
                        marginTop: 2,
                        borderRadius: "5px",
                        color: "white",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>
                        {problem.id} . {problem.title}
                      </Typography>
                      <Typography
                        sx={{
                          color:
                            problem.difficulty == "Easy"
                              ? "green"
                              : problem.difficulty == "Medium"
                              ? "yellow"
                              : "red",
                        }}
                      >
                        {problem.difficulty}
                      </Typography>
                    </Paper>
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Profiles;
