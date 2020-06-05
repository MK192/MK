
var express=require('express');
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
var bodyParser=require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));
const url = "mongodb+srv://Milan:milaknis@milan-yxsdt.mongodb.net/Vote?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
var urlendocedParser=bodyParser.urlencoded({ extended: false });
const client = new MongoClient(url, { useNewUrlParser: true });
//const bcrypt=require('bcrypt');

app.use(session({
 
  cookie:{secure:true},
  cookieName: 'session',
  secret: 'strawberry fields forever',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: true,
 
}));

var emails=' ';


//connect to db
 mongoose.connect(url||'mongodb://localhost/Vote',{
 useNewUrlParser:true,
   useUnifiedTopology:true ,
 });
  mongoose.connection.on('connected',()=>{
 console.log("database connected");
   });

//Shema
const Schema=mongoose.Schema;
const testSchema=new mongoose.Schema({
  email:String,
  username:String,
  password:String,
  vote:String,
});


//Model
const Voting=mongoose.model('Voting',testSchema);

app.get('/sign',function(req,res){
 
  res.render('sign',{})
});
app.post('/sign',urlendocedParser,function(req,res){
  
      MongoClient.connect(url, function(err, db) {
        
        if (err) throw err;
       var dbo = db.db("Vote");
       dbo.collection("votings").find({email:req.body.email,password:req.body.password}).toArray(function(err, user) {
         if(user.length!==0){
           console.log(user);
            emails=req.body.email;
          req.session.userId=req.body.id;
           res.sendFile(__dirname+'/main.html');

         }else{
           res.render('sign',{err:"Wrong email or password"});
         }
        });
      });
  
});

app.get('/',function(req,res){
 
  res.render('sign',{qs:req.query})
});

app.get('/registration',function (req, res){


  res.render('registration',{qs:req.query})
});

app.post('/registration',urlendocedParser, function(req,res){

  console.log(req.body.email);
  MongoClient.connect(url, function(err, db) {
    
    if (err) throw err;
   var dbo = db.db("Vote");
   dbo.collection("votings").find({email:req.body.email}).toArray(function(err, result) {
     
    if (err) throw err;
     console.log(result);
      
     if(result.length!==0){
        console.log("Email taken");
        
      }
       else{
       var newVote=Voting(req.body).save(function(err,data){
         if(err){throw err;}
        else  {
         // res.json(data);

        console.log("NEW data  : ",data);
        res.render('sign',{email:data.email,username:data.username,password:data.password});
              }  
         });
       }

      });
    });
   
  });


app.get('/bannerlord',function(req,res){
  res.sendFile(__dirname+'/bannerlord.html');
});
app.get('/main',function(req,res){
  
  res.sendFile(__dirname+'/main.html');
});
app.get('/cyberpunk',function(req,res){
  res.sendFile(__dirname+'/cyberpunk.html');
});
app.get('/doom',function(req,res){
  res.sendFile(__dirname+'/doom.html');
});
app.get('/ghost',function(req,res){
  res.sendFile(__dirname+'/ghost.html');
});
app.get('/legion',function(req,res){
  res.sendFile(__dirname+'/legion.html');
});
app.get('/registration',function(req,res){
  res.sendFile(__dirname+'/registration.html');
});

app.get('/tlou2',function(req,res){
  res.sendFile(__dirname+'/tlou2.html');
});
app.get('/voting',urlendocedParser,function(req,res){
  res.render('voting',{});
});
app.post('/voting',urlendocedParser,function(req,res){
  if(!req.session.userId){
    res.render('registration',{});
  }
  else{
  MongoClient.connect(url, function(err, db) {
    
    if (err) throw err;
   var dbo = db.db("Vote");
   dbo.collection("votes").find({email:req.body.email,password:req.body.password}).toArray(function(err, result) {
     
    if (err) throw err;
     console.log(result);
      
     if(result.length!==0){
        console.log("Email taken");
        
      }
       else{
              caform();
              }  
         });
       
         
      });
    
  }
})

app.get('/winners',function(req,res){
  res.sendFile(__dirname+'/winners.html');
});

app.post('/caform',urlendocedParser,function(req,res){
  console.log(req.body.email);
if(req.body.v==='doom'){
  MongoClient.connect(url, function(err, db) {
    req.body.email=emails;
    if (err) throw err;
   var dbo = db.db("Vote");
    dbo.collection("votings").updateOne({'email':req.body.email}, {$set:{vote:'doom'}}, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  }
    if(req.body.v==='Cyberpunk'){
      MongoClient.connect(url, function(err, db) {
        req.body.email=emails;
        if (err) throw err;
       var dbo = db.db("Vote");
        dbo.collection("votings").updateOne({'email':req.body.email}, {$set:{vote:'Cyberpunk'}}, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }

 if(req.body.v==='Bannerlord'){
      MongoClient.connect(url, function(err, db) {
        req.body.email=emails;
        if (err) throw err;
       var dbo = db.db("Vote");
        dbo.collection("votings").updateOne({'email':req.body.email}, {$set:{vote:'Bannerlord'}}, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }
    if(req.body.v==='tlou2'){
      MongoClient.connect(url, function(err, db) {
        req.body.email=emails;
        if (err) throw err;
       var dbo = db.db("Vote");
        dbo.collection("votings").updateOne({'email':req.body.email}, {$set:{vote:'tlou2'}}, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }

if(req.body.v==='ghost'){
      MongoClient.connect(url, function(err, db) {
        req.body.email=emails;
        if (err) throw err;
       var dbo = db.db("Vote");
        dbo.collection("votings").updateOne({'email':req.body.email}, {$set:{vote:'ghost'}}, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }
    if(req.body.v==='wd'){
      MongoClient.connect(url, function(err, db) {
        req.body.email=emails;
        if (err) throw err;
       var dbo = db.db("Vote");
        dbo.collection("votings").updateOne({'email':req.body.email}, {$set:{vote:'wd'}}, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }
  



});


app.listen(3000);