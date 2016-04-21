var express = require('express'),
    bodyParser = require('body-parser'),    // parse request (JSON, URL-encoded)
    cookieParser = require('cookie-parser'), // parse cookie for the session
    passport = require('passport'),         // passport module
    session = require('express-session'); // passport using this for store session

var app = express(),
    port = process.env.port || 5000,
    nav = [{
                    Link:'/Books',
                    Text: 'Books'
                },{
                    Link: '/Authors',
                    Text: 'Authors'
                }];

var bookRouter = require('./src/routes/bookRoute')(nav), // pass array of nav links
    authorRouter = require('./src/routes/authorRoute')(nav),
    adminRouter = require('./src/routes/adminRoute'),
    authRouter = require('./src/routes/authRoute');

// Using middleware
app.use(express.static('public')); // static content client JS, CSS, libs
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));// to support URL-encoded bodies
// Session & Auth
app.use(cookieParser());
//see https://github.com/expressjs/session
app.use(session({secret: 'libraryApp',
                saveUninitialized: true,
                resave: true}));

require('./src/config/passport')(app);

app.set('views','./src/views');
// using Jade template
// app.set('view engine', 'jade');

// using ejs
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Book', bookRouter);
app.use('/Authors', authorRouter);
app.use('/Admin', adminRouter());
app.use('/Auth', authRouter());

// render page using view engine
app.get('/', function(req, res) {
    res.render('index',{
        title: 'Books store',
        appTitle: 'LibraryApp (Node.JS + Express 4.0)',
        nav: nav
    });
});

app.listen(5000, function(err) {
    console.log('running server on port: ' + port);
});