const express = require('express')
const { Server } = require("socket.io");
const { createServer } = require('http');
const cors = require('cors')
const connect = require('./DB/Connection.js')
const userRoutes = require('./Routes/UserRoutes.js')
const chatRoutes = require('./Routes/ChatRoutes.js')

const app = express()
const port = 3002

connect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(express.json());
app.use('/api',userRoutes)
app.use('/api',chatRoutes)

const server = createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET","POST"],
//         credentials: true
//     }
// });

// app.set("socketID",'')
// io.on("connection", (socket) => {
   
//     socket.emit('connected',socket.id)
//     app.set("socketID",socket.id)
//     socket.on("send-message", ({ message, recipientID }) => {
//       // 2. Update the send-message event handling to send message to recipientID
//       // io.to(recipientID).emit("recieved-message", message);
//       socket.broadcast.emit("recieved-message",message)
//     });
  
//     // socket.on("disconnect", () => {
//     //   console.log("User disconnected");
//     // });
//   });

  
  

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})