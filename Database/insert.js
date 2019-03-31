var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, dbo) {  
  if (err) throw err;  
  db = dbo.db("assignment2");
  var myobj =  {name:'julie', password:'thorpe'};
  db.collection("credential").insertOne(myobj, function(err, res) {    
    if (err) throw err;    
    console.log("your credential is saved");    
    dbo.close(); 
  });
});
