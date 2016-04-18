var express = require('express');

var app = express();

var port = process.env.port || 5000;

var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views','./src/views');
// using Jade template
// app.set('view engine', 'jade');
// using ejs
app.set('view engine', 'ejs');

bookRouter.route('/')
    .get(function(req, res){
        res.send('Hello Books');
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Book');
    });

app.use('/Books', bookRouter);

// render page using view engine
app.get('/', function(req, res) {
    res.render('index',{
        nav: [{
                Link:'/Books',
                Text: 'Books'
            },{
                Link: '/Authors',
                Text: 'Authors'
            }]
    });
});

app.get('/books', function(req, res) {
    res.send('Hello from Books!');
});

app.listen(5000, function(err) {
    console.log('running server on port: ' + port);
});