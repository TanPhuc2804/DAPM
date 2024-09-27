const mongoose = require('mongoose')
const staffSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    numberphone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
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
      required: true
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
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role' // Assuming you have a Role schema defined
    }
  },{timestamps:true});
  
const Staff = mongoose.model("Staff",staffSchema)
module.exports = Staff