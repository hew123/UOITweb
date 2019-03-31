var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, dbo) {  
  if (err) throw err;  
  db = dbo.db("mydb");
  var myobj = [   
    { name: 'John', address: 'Highway 71'},    
    { name: 'Peter', address: 'Lowstreet 4'},    
    { name: 'Viola', address: 'Sideway 1633'} 
  ]; 
  db.collection("customers").insertMany(myobj, function(err, res) {    
    if (err) throw err;    
    console.log("Number of documents inserted: " + res.insertedCount);    
    dbo.close(); 
  });
});
