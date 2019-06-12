// Bring in Modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/form');
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', (err) => {
    console.log('err');
});

// Init App
const app = express();

// Bring in Models
let Student = require('./models/student');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Parseapplication/x-www-form-r=urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validation Middleware
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.')
        , root =namespace.shift()
        , formParam = root;
    
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg   : msg,
        value : value
    };
    }
}));

// Home Route
app.get('/', (req, res) => {
    Student.find({}, (err, students) => {
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title:'Students',
                students: students  
            });
        }
    });  
});

// Route Files
let students = require('./routes/students');
app.use('/students', students);

// Start Server
app.listen(8080, () => {
    console.log('Server has started on port:8080');
});