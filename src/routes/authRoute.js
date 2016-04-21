var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    passport = require('passport'),
    authRouter = express.Router();

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url,
                function (err, db) {
                    var collection = db.collection('users');
                    var user = {
                        username: req.body.userName,
                        password: req.body.password
                    };
                    // we can start using collection even if it isn't exist
                    collection.insert(user, function (err, results) {
                        req.login(results.ops[0],
                            function () {
                                //redirect user to the profile page
                                res.redirect('/auth/profile');
                            }
                        );
                    });
                });
        });

    authRouter.route('/singIn')
        // using local strategy
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .get(function(req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;