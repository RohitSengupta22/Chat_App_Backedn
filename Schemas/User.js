const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    Name: String,
    Email: String
})

const userSchema = new Schema({
    Email : {
        type: String,
        required: true,
        unique: true
    },

    Name: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required: true
    },

    ChatRooms : [{type: Schema.Types.ObjectId, ref: 'Chat'}]
   

   
});

const User = mongoose.model('User', userSchema);
module.exports = User;