const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:4,
        required:true
    },
    dob:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);


module.exports = new mongoose.model("User", userSchema);