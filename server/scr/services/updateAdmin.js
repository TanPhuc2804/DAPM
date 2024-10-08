const bcrypt = require('bcrypt')
const Staff = require('../models/Staff.model')
const updateAdmin = async ()=>{
   try {
const admin = await Staff.findOne({email: "admin@gmail.com"});
 if(!admin){
    console.log("admin not found");
return;

   } 
admin.fullname = "Nguyen Van B";
 admin.role = "66f8e28b66c55d58fcc3c03f";
const newPassword = "newAdmin123";
admin.newPassword = await bcrypt.hash(newPassword, 10);
await admin.save();
console.log("Admin updated");
}
catch (err){
    console.log(err.message);
}

};
module.export = updateAdmin;
