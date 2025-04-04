import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import ProblemTable from "../components/ProblemTable";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import Image1 from "../assets/Dsa.png";
import Profile from "../components/Profile";

function Home() {
  const cards = [1, 2, 3, 4, 5];
  return (
    <Box sx={{height: '100vh' ,background: "linear-gradient(135deg,rgb(90, 103, 130) 40%,rgb(255, 255, 255) 100%)"}}>
      <Box sx={{}}>
        <NavBar></NavBar>
      </Box>
      <Box sx={{maxWidth: '80%',margin:'auto'}}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 9 }}>
          {/* <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {cards.map((card) => {
              return (
                <Card
                  key={Math.random()}
                  sx={{
                    width: "250px",
                    margin: "10px",
                    padding: "10px",
                    backgroundColor: "#1A2B4A",
                    borderRadius: 3,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100"
                      image={Image1}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography>Top 50 Problems</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div> */}

          <Paper>
          <div
            style={{ position: "relative", margin: "auto", marginTop: "20px" }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", }}>
              <thead style={{ backgroundColor: "#1A2B4A", color: "white" }}>
                <tr style={{ paddingBottom: "6px" }}>
                  <th style={{ paddingLeft: "18px" }}>Status</th>
                  <th style={{ paddingRight: "40px" }}>Title</th>
                  <th style={{ padding: "8px" }}>Difficulty</th>
                  <th style={{ padding: "8px" }}>Category</th>
                  <th style={{ padding: "8px" }}>Solution</th>
                </tr>
              </thead>
              <ProblemTable />
            </table>
          </div>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Profile></Profile>
        </Grid2>
      </Grid2>
      </Box>
    </Box>
  );
}

export default Home;
