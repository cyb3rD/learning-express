var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    authorRouter = express.Router();

// function for creating router
var router = function(nav) {

    authorRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            // open db connection
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                // get all data
                collection.find({}).toArray(
                    function(err, results) {
                        res.render('authorsListView',{
                            title: 'Authors',
                            appTitle: 'LibraryApp (Authors)',
                            nav: nav,
                            books: results // pass array from MongoDB
                        });
                    }
                );
            });
        });

    return authorRouter;

}; //router

module.exports = router;