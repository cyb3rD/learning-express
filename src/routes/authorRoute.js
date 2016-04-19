var express = require('express');

var authorRouter = express.Router();

// function for creating router
var router = function(nav) {

    var Books = [
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

    authorRouter.route('/')
        .get(function(req, res) {
            res.render('authorsListView',{
                title: 'Authors',
                nav: nav,
                books: Books // pass array of the books
            });
        });

    // bookRouter.route('/:id')
    //     .get(function(req, res) {
    //         var id = req.params.id;
    //         res.render('bookView',{
    //             title: 'Book',
    //             nav: nav,
    //             book: Books[id] // pass book ID
    //         });
    //     });

    return authorRouter;

}; //router

module.exports = router;