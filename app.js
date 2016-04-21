var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.port || 5000,
    nav = [{
                    Link:'/Books',
                    Text: 'Books'
                },{
                    Link: '/Authors',
                    Text: 'Authors'
                }],

    bookRouter = require('./src/routes/bookRoute')(nav), // pass array of nav links
    authorRouter = require('./src/routes/authorRoute')(nav),
    adminRouter = require('./src/routes/adminRoute'),
    authRouter = require('./src/routes/authRoute');

app.use(express.static('public'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));// to support URL-encoded bodies

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
        nav: nav
    });
});

app.listen(5000, function(err) {
    console.log('running server on port: ' + port);
});