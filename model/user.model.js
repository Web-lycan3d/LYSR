const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        required: true,
    },
    email: {
        type: String,
        required: 'This feild is required'
    },
    mobile: {
        type: String,
        minlength: 10,
        maxlength: 15,
        required: true,
    },
    message: {
        type: String,
        required: 'This feild is required'
    },
})

// custom validation
userSchema.path('email').validate((val) =>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid Email..');
mongoose.model('user' , userSchema);