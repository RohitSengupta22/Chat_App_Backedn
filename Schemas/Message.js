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
   Chat: {
    type:  Schema.Types.ObjectId,
    ref: 'User'
   }
})



const Message = mongoose.model('Message', messageSchema);
module.exports = Message;