var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID,
    bookRouter = express.Router();

// function for creating router
var router = function(nav) {

    // Show all books
    bookRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            // open db connection
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                // get all data
                collection.find({}).toArray(
                    function(err, results) {
                        res.render('booksListView',{
                            title: 'Books',
                            nav: nav,
                            appTitle: 'LibraryApp (Books)',
                            books: results // pass array from MongoDB
                        });
                    }
                );
            });
        });

    // Show single book
    bookRouter.route('/:id')
        .get(function(req, res) {
            // get id param from the url and create objectId with it
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            // open db connection
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                // get first one that it finds
                collection.findOne({_id: id},
                    function(err, results) {
                        res.render('bookView',{
                            title: 'Books',
                            nav: nav,
                            book: results // pass array from MongoDB
                        });
                    }
                );
            });
        });

    return bookRouter;

}; //router

module.exports = router;