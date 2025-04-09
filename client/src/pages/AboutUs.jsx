import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NavBar from '../components/NavBar';

const heroImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const codeSubmission = 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png';
const discussion = 'https://cdn-icons-png.flaticon.com/512/2452/2452499.png';
const chatbot = 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png';
const profile = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

const features = [
  {
    title: 'Code Submission & Problem Solving',
    description: 'Solve challenges, submit code, and get instant feedback. Perfect your skills with our curated problem sets.',
    icon: codeSubmission
  },
  {
    title: 'Interactive Discussion Forum',
    description: 'Collaborate with a vibrant community. Ask questions, share solutions, and learn from peers.',
    icon: discussion
  },
  {
    title: 'Smart Coding Assistant',
    description: 'Get instant help from our AI-powered chatbot. Debug code, learn concepts, and optimize solutions.',
    icon: chatbot
  },
  {
    title: 'Personalized Profile',
    description: 'Track progress, earn badges, and showcase your achievements with a dynamic developer profile.',
    icon: profile
  }
];

function AboutUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <Box sx={{position:'sticky'}}>
            <NavBar></NavBar>
        </Box>
      <Box 
        sx={{ 
          position: 'relative',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt="Coding workspace"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography 
            variant={isMobile ? 'h3' : 'h2'} 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'common.white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Welcome to <Box component="span" sx={{ color: 'primary.main' }}>CodeCraft</Box>
          </Typography>
          <Typography variant="h5" component="p" sx={{ color: 'common.white', mb: 4 }}>
            Where innovation meets mastery in coding!
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Our Mission
        </Typography>
        <Typography variant="h6" component="p" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          At <Box component="span" fontWeight="bold">CodeCraft</Box>, we empower developers of all levels with tools to learn, 
          collaborate, and grow. Whether you're a beginner or an expert, our platform is 
          designed to help you craft elegant code and solve real-world problems.
        </Typography>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            🌟 Why Choose CodeCraft?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    image={feature.icon}
                    alt={feature.title}
                    sx={{ 
                      height: 120, 
                      width: 'auto', 
                      objectFit: 'contain',
                      mx: 'auto',
                      p: 2
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3" align="center">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4 }}>
          💡 Our Vision
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          We believe coding should be <Box component="span" fontWeight="bold">accessible, collaborative, and fun</Box>. 
          CodeCraft is more than a platform—it's a <Box component="span" fontWeight="bold">community</Box> where 
          curiosity thrives and skills evolve.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          sx={{ 
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          Join CodeCraft Today
        </Button>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body1" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} CodeCraft. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            "The best way to predict the future is to code it." — <Box component="span" fontWeight="bold">CodeCraft Team</Box>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutUs;