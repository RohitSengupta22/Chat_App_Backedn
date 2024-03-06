const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  Sender: {
   type:  Schema.Types.ObjectId,
   ref: 'User'
  },
  Content: {
   type: String
  },
  DateTime : {
    type: String
  }
})

const chatNameSchema = new Schema({
  initiator: {
    type: String
  },
  Name: {
    type: String
  },
  receiver: {
    type: String
  }
});


const chatSchema = new Schema({
  Users : [{type: Schema.Types.ObjectId, ref: 'User' }],
  ChatName: chatNameSchema,
  Messages : [messageSchema]
  
},
{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;