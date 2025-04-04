import React, { Fragment, useEffect, useState, useRef } from "react";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import NavBar from "../components/NavBar";
import User from "../components/User";
import MessageComponent from "../components/MessageComponent";
import { InputBox } from "../components/StyledComp";
import { useDispatch, useSelector } from "react-redux";

function Discuss() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log(user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      transports: ["websocket"],
    });

    socketRef.current.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socketRef.current.emit("message", {message,sender:user._id,sendername : user.username}, () => {
        setMessage("");
      });
      setMessage("");
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      <Grid container spacing={2} sx={{ height: "calc(100vh - 64px)", marginTop: "10px" }}>
        <Grid item xs={12} md={3} sx={{ backgroundColor: "#1A2B4A", borderRadius: "10px" }}>
          <User />
        </Grid>
        <Grid item xs={12} md={9} sx={{ display: "flex", flexDirection: "column", background: "linear-gradient(135deg,rgb(90, 103, 130) 40%,rgb(255, 255, 255) 100%)", borderRadius: "10px", height: "calc(100vh - 74px)", padding: "10px" }}>
          <Stack sx={{ flexGrow: 1, overflowY: "auto", padding: "10px" }}>
            {messages.length > 0 ? messages.map((i) => (
              <MessageComponent key={i.id} sender={i.sender} message={i.message} sendername={i.sendername} />
            )) : <p>No messages to display</p>}
          </Stack>
          <hr style={{ color: "#1A2B4A", width: "100%", margin: "10px 0" }} />
          <form style={{ display: "flex", alignItems: "center", padding: "0 1rem" }} onSubmit={handleSendMessage}>
            <InputBox placeholder="Type your message here" sx={{ flex: 1, margin: "0 1rem" }} onChange={(e) => setMessage(e.target.value)} value={message} />
            <IconButton type="submit" sx={{ backgroundColor: "#1A2B4A", color: "white", marginLeft: "1rem", padding: "0.5rem", "&:hover": { bgcolor: "#1A2B4A" } }}>
              <SendIcon />
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Discuss;
