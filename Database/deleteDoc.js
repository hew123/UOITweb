var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err; dbo = db.db('assignment2');
  var myquery = { name: 'Zeinab Joudaki' };
  dbo.collection("group").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted"); db.close();
  });
});
