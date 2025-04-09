import React, { Fragment, useEffect, useState, useRef } from "react";
import { Box, Grid, Grid2, IconButton, Stack } from "@mui/material";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import NavBar from "../components/NavBar";
import User from "../components/User";
import MessageComponent from "../components/MessageComponent";
import { InputBox } from "../components/StyledComp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { userExist } from "../redux/reducers/auth";

function Discuss() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(true);
  const containerRef = useRef(null); //In leamon terms ref is a container that do not change its value on changing the state
  const socketRef = useRef(null);

  useEffect(() => {
    console.log(containerRef);
    if (containerRef?.current) {
      const element = containerRef.current;
      element.scrollTo({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    console.log("current Page", page);
    const getMessage = async () => {
      setLoader(true);
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        const newMessage = await axios.get(
          `http://localhost:4000/user/getMessages/{page}`,
          config
        );
        console.log(newMessage.data.message);
        setMessages(newMessage.data.message);
        setLoader(false);
        console.log(messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [page]);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      transports: ["websocket"],
    });

    socketRef.current.on("message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socketRef.current.emit(
        "message",
        { message, sender: user._id, sendername: user.username },
        () => {
          setMessage("");
        }
      );
      setMessage("");
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      <Grid2
        container
        spacing={2}
        sx={{ height: "calc(100vh - 64px)", marginTop: "10px" }}
      >
        <Grid2
          item
          size={{ xs: 6, md: 3 }}
          sx={{ backgroundColor: "#1A2B4A", borderRadius: "10px" }}
        >
          <User userData={user} />
        </Grid2>
        {loader ? (
          <Loader></Loader>
        ) : (
          <Grid2
            item
            size={{ xs: 6, md: 9 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              background:
                "linear-gradient(135deg,rgb(90, 103, 130) 40%,rgb(255, 255, 255) 100%)",
              borderRadius: "10px",
              height: "calc(100vh - 74px)",
              padding: "10px",
            }}
          >
            <Stack
              ref={containerRef}
              boxSizing="border-box"
              height="90%"
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: "10px",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {messages.length > 0 ? (
                messages.map((i) => (
                  <MessageComponent
                    key={i.id}
                    sender={i.sender._id}
                    message={i.message}
                    sendername={i.sender.username}
                    date={i.createdAt}
                  />
                ))
              ) : (
                <p>No messages to display</p>
              )}
            </Stack>
            <hr style={{ color: "#1A2B4A", width: "100%", margin: "10px 0" }} />
            <form
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
              }}
              onSubmit={handleSendMessage}
            >
              <InputBox
                placeholder="Type your message here"
                sx={{ flex: 1, margin: "0 1rem" }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: "#1A2B4A",
                  color: "white",
                  marginLeft: "1rem",
                  padding: "0.5rem",
                  "&:hover": { bgcolor: "#1A2B4A" },
                }}
              >
                <SendIcon />
              </IconButton>
            </form>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
}

export default Discuss;
