require('dotenv').config()
const express = require('express')
const User = require('../Schemas/User.js')
const Chat = require('../Schemas/Chats.js')
const Message = require('../Schemas/Message.js')
const fetchUser = require('../Middleware/FetchUser.js')

const router = express.Router();
router.post('/search', fetchUser, async (req, res) => { //search recipient
    try {

        const { Email } = req.body
        const userID = req.id;
        const user = await User.findById(userID);
        const searchedUser = await User.findOne({ Email })
        const chat = await Chat.findOne({
            Users: { $all: [userID, searchedUser._id] },
        });

        if(chat){
            res.status(200).send("Chat already created with this user.")
        }else{

            if (searchedUser) {

                const newChat = new Chat({
                    Users: [user._id, searchedUser._id],
                    ChatName: {
                        initiator : user.Email,
                        Name: user.Name+'&'+searchedUser.Name,
                        receiver : Email
                    }
    
                })
    
                await newChat.save()
                user.ChatRooms.push(newChat._id)
                searchedUser.ChatRooms.push(newChat._id)
                await user.save();
                await searchedUser.save();
                
    
    
                res.status(200).json({ newChat })

        }else {
            res.status(200).send("No such user found")
        }

       

        } 


    } catch (e) {

        console.log(e)

    }
})

router.post('/send/:recipient', fetchUser, async (req, res) => {
    try {

        const userID = req.id;
        const recipientEmail = req.params.recipient
        const recipientID = await User.findOne({ Email: recipientEmail }).select("_id")
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const milliseconds = currentDate.getMilliseconds();

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

       

        // Now, 'formattedDateTime' contains the formatted date and time

        const chat = await Chat.findOne({
            Users: { $all: [userID, recipientID] },
        });

        const { message } = req.body;
        const newMessage = {
            Sender: userID,
            Content: message,
            DateTime: formattedDateTime
          }

          chat.Messages.push(newMessage)
          await chat.save()

          res.status(200).json({chat})

    } catch (e) {

        console.log(e)
    }
})

router.get('/messages/:id',async(req,res)=>{
    try{

        const chatId = req.params.id;
        const chat = await Chat.findById(chatId)
        res.status(200).json({chat})

    }catch(e){

        console.log(e)
    }
})

router.get('/')


module.exports = router;