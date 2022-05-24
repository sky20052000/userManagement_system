const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    favoriateBook:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    isbn_number:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
}
);

module.exports  = new mongoose.model("Book", bookSchema);