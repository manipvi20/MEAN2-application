var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/admin', ['info']);
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

router.get('/info/:id', function(req, res, next){
    db.info.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});


//Post method
router.post('/info', function(req, res, next) {
    var info = req.body;
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


module.exports = router;