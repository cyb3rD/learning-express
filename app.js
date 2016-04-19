var express = require('express'),
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
    adminRouter = require('./src/routes/adminRoute');

app.use(express.static('public'));

app.set('views','./src/views');
// using Jade template
// app.set('view engine', 'jade');

// using ejs
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Book', bookRouter);
app.use('/Authors', authorRouter);
app.use('/Admin', adminRouter());

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