import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import { dbConnect } from './config/database.js';
import userRouter from './routes/user.js'
import { Server } from 'socket.io';
import {createServer} from 'http' //This is to create the http server}
import { corsOption } from './constants/config.js';
import { socketAuthMiddleware } from './middlewares/socketAuth.js';
import { Message } from './models/messages.js';
const app = express();
const server = createServer(app);
const io = new Server(server, {cors:corsOption});
app.use(express.json())
app.use(cookieParser()) //This is to use the cookies
app.use(express.urlencoded({ extended:true }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.get('/',(request,response)=>{
    response.send("Hello");
})

// Here should be the middleware to check if the user is authenticated and also get the user Id
// here io is socket server Instasnce
// io.use is use to define the middlewares
// cookie parser is used to parse the cookies
io.use((socket,next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async(err) => await socketAuthMiddleware(err,socket,next)
    )
});
const NEW_MESSAGE = "message"; 
const roomName = "room1";
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const user = socket.user;
    // console.log('user:', socket.user);
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);

    socket.on(NEW_MESSAGE, async(data) => {
        // console.log("Message received:", data);

        const messageforDb = {
            message:data.message,
            sender:user._id,
            createdAt:Date.now()
        }
        const messageforRealTime = {
            message:data.message,
            sender:data.sender,
            sendername:data.sendername,
            createdAt:Date.now()
        }
        console.log(messageforDb);

        io.to(roomName).emit(NEW_MESSAGE, messageforRealTime);

        try{
            await Message.create(messageforDb);
        }catch(error){
            console.log(error);
        }
        // If you want to send to **everyone including the sender**, use:
        // io.to(roomName).emit(NEW_MESSAGE, data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});



app.use("/user",userRouter)

dbConnect();

server.listen(4000,() => {
    console.log('Example app is listening on port number 4000');
})