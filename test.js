var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/admin";
console.log(1111);
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("info").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});