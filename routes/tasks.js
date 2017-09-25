var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var async = require('async');
var db = mongojs('mongodb://127.0.0.1:27017/admin', ['info', 'posts']);
//var db = mongojs('mongodb://<dbuser>:<dbpassword>@ds147080.mlab.com:47080/mean2app', ['info']);

router.get('/info', function(req, res, next){
    console.log("this is test");
    db.info.find(function(err, info){
        console.log(info);
        if(err){
            res.send(err);
        }
        res.json(info);
    });
});

router.get('/posts', function(req, res, next){
    var postsDetails = [];
    db.posts.find(function(err, posts){ 
        var allposts = posts;
        if(err){
            res.send(err);
        }
        async.each(allposts, function(allpost, callback) {
            var userPost = {
                posts: allpost,
                profile_img: ''
            };
            postsDetails.push(userPost);
            
            db.info.findOne({username: allpost.username}, 
                function(error, doc) {
                    if (error)
                        callback(error);
                    else {
                        userPost.profile_img = doc.profile_img;
                        callback();
                    }
                }
            );
        }, 
        function(err) {
            if (err)
                res.send(500, err.toString());
            else
                res.send(postsDetails);
        });
    });
});

router.get('/info/:id', function(req, res, next){
    db.info.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});


router.get('/userinfo/:username', function(req, res, next){
    db.info.findOne({username: req.params.username},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});



//Post method
router.post('/info', function(req, res, next) {
    var info = req.body;
    console.log(info);
    if(!info.name) {
        res.status(400);
        res.json({
            "error": "Bad data / Missing data"
        })
    }
    else {
        db.info.save(info, function(err, info){
            if(err){
                res.send(err);
            }
            res.json(info);
        })
    }
});

router.post('/post', function(req, res, next) {
    var info = req.body;
    console.log(info);
    if(!info.post) {
        res.status(400);
        res.json({
            "error": "Bad data / Missing data"
        })
    }
    else {
        db.posts.save(info, function(err, posts){
            if(err){
                res.send(err);
            }
            res.json(posts);
        })
    }
});


//Delete Info
router.delete('info/:id', function(req, res, next){
    db.info.remove({_id: mongojs.ObjectId(req.params.id)},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});

//Update info
router.put('info/:id', function(req, res, next){
    var info = req.body;
    var updatedInfo = {};

    if(info.name){
        updatedInfo.name = info.name;
    }
    if(info.age){
        updatedInfo.age = info.age;
    }
    if(info.company){
        updatedInfo.company = info.company;
    }

    if(!updatedInfo) {
        res.status(400);
        res.json({
            "error": "Couldn't update data / Invalid data"
        })
    }
    else {
        db.info.update({_id: mongojs.ObjectId(req.params.id)},updatedInfo, {}, function(err, info){
            if(err){
                res.send(err);
            }
            res.json(info);
        });
    }
});


router.put('/replies/:id', function(req, res, next){
    var reply = req.body;
    var updateInfo;
    db.posts.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, data){
        if(err){
            res.send(err);
        }
        data.replies.push(reply);
        updateInfo = data;
        
        if(!updateInfo) {
            res.status(400);
            res.json({
                "error": "Couldn't update data / Invalid data"
            })
        }
        else {
            db.posts.update({_id: mongojs.ObjectId(req.params.id)}, updateInfo, {}, function(err, info){
                if(err){
                    res.send(err);
                }
                res.json(info);
            });
        }
        
    });
});



module.exports = router;