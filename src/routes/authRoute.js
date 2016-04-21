var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    authRouter = express.Router();

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
        });

    return authRouter;
};

module.exports = router;