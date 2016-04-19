var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    adminRouter = express.Router();

var router = function() {
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false
        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            read: false
        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            read: false
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false
        },
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        }
    ];
    // route for adding books by Admin
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            // open db connection
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                // insert data into db
                collection.insertMany(books,
                    function(err, results) {
                        res.send(results);
                        db.close(); // Close connection must be inside callback
                    }
                );
            });
            // res.send('inserting books...');
        });

    return adminRouter;
};

module.exports = router;