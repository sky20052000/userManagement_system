const config = require("./config/config.json");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// configaration
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// db connection
mongoose.connect(config.MONGO_URL).then((data)=>{
    console.log("Mongoose Connected to Database!");
}).catch((err)=>{
    console.log("No Database connection",err);
});

// user routes
app.use("/api/userRoutes", require("./routes/userRoutes"));

// book routes
app.use("/api/bookRoutes", require("./routes/bookRoutes"));

app.listen(config.PORT,()=>{
    console.log(`Server Listenning on the: http://localhost:${config.PORT}`);
})