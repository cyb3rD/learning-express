var express = require('express'),
    bookRouter = require('./src/routes/bookRoute'),
    app = express(),
    port = process.env.port || 5000;

app.use(express.static('public'));

app.set('views','./src/views');
// using Jade template
// app.set('view engine', 'jade');
// using ejs
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

// render page using view engine
app.get('/', function(req, res) {
    res.render('index',{
        title: 'Books store',
        nav: [{
                Link:'/Books',
                Text: 'Books'
            },{
                Link: '/Authors',
                Text: 'Authors'
            }]
    });
});

app.listen(5000, function(err) {
    console.log('running server on port: ' + port);
});