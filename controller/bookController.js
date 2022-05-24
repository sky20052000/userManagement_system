const Book = require("../models/bookModel");

const bookController = {
     createbook:async(req,res)=>{
         try{
           const createBook =  new Book(req.body);
           const saveBook  = await createBook.save();
           return res.status(201).json({
               message:"Book added successfully",
               data:saveBook
           });
         }catch(err){
           return res.status(500).json({
               Message:err.Message
           });
         }
     },

     // get all  favoriate book 
     getFavoriateBook:async(req,res)=>{
         try{
             const getBook = await Book.find({});
             return res.status(200).json({
                 message:"success",
                 data:getBook
             });
         }catch(err){
             return res.status(500).json({
                 message:err.message
             });
         }
     },

     // get book by query by individually with all details
     getIndividualBook:async(req,res)=>{
        const qnew= req.query.new;
        const qfavoirate = req.query.favoriate
         try{
            let favoirateBooks;
            if(qnew){
                favoirateBooks =  await Book.find().sort({ createdAt: -1 }).limit(4);
            }else if(qfavoirate){
                favoirateBooks = await Book.find({
                favoirateBooks: {
                  $in: [qfavoirate],
                },
              });
            }else{
      
                favoirateBooks = await Book.find();
            }
            res.status(200).json(favoirateBooks);
         }catch(err){
             return res.status(500).json({
                 message:err.message
             })
         }
     },
}

module.exports = bookController;