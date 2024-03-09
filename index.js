const express = require('express')
const { Server } = require("socket.io");
const { createServer } = require('http');
const cors = require('cors')
const connect = require('./DB/Connection.js')
const userRoutes = require('./Routes/UserRoutes.js')
const chatRoutes = require('./Routes/ChatRoutes.js')

const app = express()
const port = process.env.PORT || 3002

connect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(express.json());
app.use('/api',userRoutes)
app.use('/api',chatRoutes)

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://chatapp5794.netlify.app",
        methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you want to allow
        credentials: true
    }
});

io.on("connection", (socket) => {

 console.log("connected to socket.io")

 socket.on("JoinChat",({chatID})=>{
  console.log(`User joined ${chatID}`)
  socket.join(chatID);
 })

 socket.on("messageSent", (messageObj)=>{
  const chatID = messageObj._id
  const message = messageObj.Messages[messageObj.Messages.length-1]
  console.log("message sent")
  socket.to(chatID).emit("newMessage", message);
 })
  });

  
  

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})