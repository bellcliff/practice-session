var router = require('express').Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test');
var Q = require('q');

router.get('/', function(req, res, next) {
    var info = {};
    if (req.session && !!req.session.user && !!req.session.user.username) 
        info.username = req.session.user.username;
    res.json(info);
});

router.post('/', function(req, res, next) {
    var user = req.body;
    // TODO, check username and password
    if (!user || !user.username || !user.password) {
        res.json({
            msg: 'username or password is needed'
        });
        return;
    }
    db.then(function(db) {
        // check user exists and valid
        return db.collection('users').find(user).toArray();
    }).then(function(users) {
        if (!users || users.length == 0) {
            return {
                msg: 'username and password not matched'
            };
        }
        var deferred = Q.defer();
        req.session.user = users[0];
        req.session.save(function(err) {
            if (err) deferred.reject(err)
            else deferred.resolve({
                username: user.username
            })
        })
        return deferred.promise;
    }).then(function(info) {
        res.json(info)
    }).catch(function(err) {
        console.log('login fail', err);
        next(err);
    });
});

router.delete('/', function(req, res, next){
    req.session.destroy(function(err){
        if (err) next(err)
        else res.json({})
    })
})

module.exports = router;
