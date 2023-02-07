const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
// const { Socket } = require("dgram");

const app = express();
app.use(cors());
dotenv.config({ path: "./.env" });
const port = 4000 || process.env.PORT;

const users = [{}];

app.get("/", (req, res) => {
  res.send("now all good");
});

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("connection is new");
  socket.on("join", ({ user }) => {
    users[socket.id] = user;
    console.log(`user joined ${user}`);
    socket.broadcast.emit("userJoined", {user: "Admin",message: `${users[socket.id]} has joined `,});
    socket.emit("welcome", {user: "Admin",message: `welcome to the chat ${users[socket.id]} `,});
  });

  socket.on('message' ,({message ,id})=>{
       io.emit('sendMessage',{user:users[id],message ,id})
  })

  socket.on("disconect", () => {
    socket.broadcast.emit("leave", { user: "Admin", message: `${users[socket.id]}  has left` });
    console.log(`user leave`);
  });
});
server.listen(port, () => {
  console.log(`the port is running http://localhost:${port}`);
});
