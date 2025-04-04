import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import NavBar from "../components/NavBar";
import CodeIcon from "@mui/icons-material/Code";
import ForumIcon from "@mui/icons-material/Forum";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useNavigate } from "react-router";

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: 250,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg,#1A2B4A 40%,rgb(255, 255, 255) 100%)",
  color: "white",
  padding: theme.spacing(15, 0, 10),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
}));

function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <NavBar />
      <HeroSection>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Build{" "}
            <Box component="span" sx={{ color: "#ffeb3b" }}>
              Real
            </Box>{" "}
            Coding Skills
          </Typography>

          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{
              mb: 4,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            The most effective platform to master programming through hands-on
            coding challenges, real-world projects, and community support.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
              mb: 6,
            }}
          >
            <Button
              variant="contained"
              color="#1A2B4A"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
              onClick={() => navigate("/authentication")}
            >
              Start Coding Now
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Take a Tour
            </Button>
          </Box>

          <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffeb3b" }}
              >
                100+
              </Typography>
              <Typography variant="subtitle1">Coding Challenges</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffeb3b" }}
              >
                20+
              </Typography>
              <Typography variant="subtitle1">Languages</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffeb3b" }}
              >
                50K+
              </Typography>
              <Typography variant="subtitle1">Developers</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffeb3b" }}
              >
                24/7
              </Typography>
              <Typography variant="subtitle1">Support</Typography>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Key Features
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Everything you need to become a better developer
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard elevation={4}>
              <CodeIcon color="#1A2B4A" sx={{ fontSize: 60, mb: 2 ,color: "#1A2B4A"}} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Multi-Language IDE
              </Typography>
              <Typography>
                Code in 20+ languages with our powerful in-browser IDE with
                real-time feedback and debugging.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard elevation={4}>
              <ForumIcon color="#1A2B4A" sx={{ fontSize: 60, mb: 2,color: "#1A2B4A" }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Discussion Forum
              </Typography>
              <Typography>
                Connect with other developers, ask questions, and share
                knowledge in our active community.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard elevation={4}>
              <TrackChangesIcon color="#1A2B4A" sx={{ fontSize: 60, mb: 2,color: "#1A2B4A", }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Progress Tracking
              </Typography>
              <Typography>
                Visualize your learning journey with detailed analytics and
                personalized recommendations.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <FeatureCard elevation={4}>
              <SchoolIcon  sx={{ fontSize: 60, mb: 2, color: "#1A2B4A" }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Curated Challenges
              </Typography>
              <Typography>
                Hundreds of hand-picked problems from beginner to advanced
                levels to sharpen your skills.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="md">
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Real-World Coding Environment
              </Typography>
              <Typography paragraph>
                Our cloud-based IDE provides a complete development environment
                with all the tools you need, accessible from any device.
              </Typography>
              <Typography paragraph>
                No setup required - just open your browser and start coding
                immediately with autocomplete, syntax highlighting, and more.
              </Typography>
              <Button
                variant="contained"
                sx={{backgroundColor: "#1A2B4A"}}
                startIcon={<TerminalIcon />}
              >
                Try the Editor
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#263238",
                  borderRadius: 2,
                  p: 2,
                  boxShadow: 3,
                }}
              >
                <Typography variant="caption" color="textSecondary">
                  // Example code in our editor
                </Typography>
                <Box sx={{ color: "white", fontFamily: "monospace", mt: 1 }}>
                  <div style={{ color: "#ff5370" }}>function</div>{" "}
                  <div style={{ color: "#82aaff" }}>binarySearch</div>(arr,
                  target) {"{"}
                  <br />
                  <div style={{ marginLeft: "20px", color: "#ffcb6b" }}>
                    let
                  </div>{" "}
                  left = 0;
                  <br />
                  <div style={{ marginLeft: "20px", color: "#ffcb6b" }}>
                    let
                  </div>{" "}
                  right = arr.length - 1;
                  <br />
                  <br />
                  <div style={{ marginLeft: "20px", color: "#ff5370" }}>
                    while
                  </div>{" "}
                  (left {"<="} right) {"{"}
                  <br />
                  <div style={{ marginLeft: "40px", color: "#ffcb6b" }}>
                    const
                  </div>{" "}
                  mid = Math.floor((left + right) / 2);
                  <br />
                  <div style={{ marginLeft: "40px", color: "#ff5370" }}>
                    if
                  </div>{" "}
                  (arr[mid] === target) {"{"}
                  <br />
                  <div style={{ marginLeft: "60px", color: "#ff5370" }}>
                    return
                  </div>{" "}
                  mid;
                  <br />
                  <div style={{ marginLeft: "40px", color: "#ff5370" }}>
                    {"}"}
                  </div>
                  <br />
                  <div style={{ marginLeft: "40px" }}>
                    arr[mid] {"<"} target ? left = mid + 1 : right = mid - 1;/
                  </div>
                  <br />
                  <div style={{ marginLeft: "20px", color: "#ff5370" }}>
                    {"}"}
                  </div>
                  <br />
                  <div style={{ marginLeft: "20px", color: "#ff5370" }}>
                    return
                  </div>{" "}
                  -1;
                  <br />
                  {"}"}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Ready to Level Up Your Coding Skills?
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Join thousands of developers who are improving their skills every
            day.
          </Typography>
          <Button variant="contained" size="large" sx={{backgroundColor: "#1A2B4A"}}>
            Get Started for Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
