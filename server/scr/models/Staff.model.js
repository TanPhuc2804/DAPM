const mongoose = require('mongoose')
const staffSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    numberphone: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      validate:   
   {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v);   
  
        },
        message: 'Invalid email address'
      }
    },
    address: {
      type: String,
    },
    fullname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    birthday: {
      type: Date,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role' // Assuming you have a Role schema defined
    }
  },{timestamps:true});
  
const Staff = mongoose.model("Staff",staffSchema)
module.exports = Staff