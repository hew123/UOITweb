var fs = require ("fs");
var express =  require("express");
var bodyParser = require('body-parser')
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoClient = require("mongodb").MongoClient;
var multer = require("multer")
var upload = multer({ dest: __dirname+ '/Public/uploads/'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static(__dirname +'/Public'));
app.use(express.static(__dirname +'/admin/cssimgjs'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 30000 //10seconds vs----300seconds--5mins
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// middleware function to check for logged-in users
/*var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};*/

// route for Home-Page
/*app.get('/', sessionChecker, (req, res) => {
    res.redirect('/userinterface');
}); */

// route for user Login
app.route('/login')
    .get((req, res) => {
      if (req.session.user && req.cookies.user_sid) {
          res.redirect('/bio');}
      else{
        res.sendFile(__dirname + '/admin/login.html');}
    })
    .post((req, res) => {
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
          if (err) throw err;
          var dbo = db.db("assignment2");
          dbo.collection("credential").findOne({},function(err,result){
            if (err) throw err;
                var userid = result.name;
                var password = result.password;
                db.close;
                //console.log(userid);
                //console.log(password);
                console.log(req.body);
                if(userid == req.body.user && password == req.body.password){
                  console.log("successful login");
                  req.session.user = userid;
                  res.redirect('/bio');
                }else {
                  console.log("fail sucker");
                  res.redirect('/login');
                }
              });
            });
    });

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('/contact', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/contact-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/bio', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/bio-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/group', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/group-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/news', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/news-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/press', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/press-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/pub', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/pub-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/research', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/research-program-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/teaching', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/admin/teaching-admin.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/', (req, res) => {
      res.sendFile(__dirname + '/Public/home.html');
});

app.post('/update/contact',upload.single('file'), function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.file);
    var file_name = '/images/' + req.file.originalname;
    fs.rename(req.file.path, __dirname + '/Public' + file_name, function(err) {
       if (err) throw err;
     });
    req.body.file_name = file_name;
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("contact").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your contacts are saved in Database");
        db.close();
      });
    });
    res.send("your contacts have been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/contact', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("contact").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result[result.length-1]);
      //res.json(result[0]);
      db.close;
    });
  });
});

app.post('/update/group', function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("group").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/group', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("group").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close;
    });
  });
});

app.post('/update/press', function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("press").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/press', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("press").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close;
    });
  });
});

app.post('/update/pub', function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("pub").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/pub', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("pub").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close;
    });
  });
});

app.post('/update/teaching', function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("teaching").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/teaching', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("teaching").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close;
    });
  });
});

app.post('/update/research', function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("research").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/research', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("research").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close;
    });
  });
});

app.post('/update/news', function (req, res){
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("news").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/news', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("news").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close;
    });
  });
});

app.post('/update/bio',upload.single('file'), function (req, res){
  console.log(req.file);
  console.log(req.session.user);
  console.log(req.cookies.user_sid);
  if (req.session.user && req.cookies.user_sid) {
    var file_name = '/images/' + req.file.originalname;
    fs.rename(req.file.path, __dirname + '/Public' + file_name, function(err) {
       if (err) throw err;
     });
    req.body.file_name = file_name;
    console.log(req.body);
    var myobj = req.body;
    var url = "mongodb://localhost:27017/assignment2";
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("assignment2");
      dbo.collection("bio").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("your data is saved in Database");
        db.close();
      });
    });
    res.send("your data has been saved in Database");
  } else {
      res.redirect('/login');
  }
});

app.get('/data/bio', function (req, res){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    var dbo = db.db("assignment2");
    dbo.collection("bio").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      res.json(result[result.length-1]);
      db.close;
    });
  });
});

app.listen(8080);
