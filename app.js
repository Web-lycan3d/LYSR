require("./db/db")
const express = require('express');
const mongoose = require("mongoose");
const User = mongoose.model('user');
const path = require('path');
const hbs = require('hbs');

const app = express();

const viewPath = path.join(__dirname, './views')
const partialViewPath = path.join(__dirname, './views/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialViewPath);

app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index', {
        title: 'LYSR|HOME'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'LYSR|ABOUT'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'LYSR|CONTACT',
        user: "",
    });
});


app.post('/submit', function (req, res) {
    console.log(req.body);
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var user = new User();
    user.fullname = req.body.name;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.message = req.body.message;
    user.save((err, docs) => {
        if (!err)
            res.render("contact-success", {
                title: 'Contact'
            });
        else {
            console.log('error in recording ' + err);
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("contact", {
                    user: req.body,
                    title: 'Contact',
                });
            }
            else
                console.log('Error during record insertion:' + err);
        }
    })
}
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullNameError'] = "Too Short";
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = "Invalid Phone No.";
            default:
                break;
        }
    }
}

var PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})