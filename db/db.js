const mongoose = require("mongoose");

const URI= "mongodb+srv://root:abhi0317@demo.mb7pd.mongodb.net/Lysr?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if(!err){
        console.log("database is connected");
    }
    else{
        console.log('Error in db connection:' + err)
    }
});
require("../model/user.model");
