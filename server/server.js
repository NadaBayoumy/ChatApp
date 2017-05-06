const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mondodb = require('mongodb');
const Mongoclient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var database;
var messages = [];
var users = [];
var Client;

app.use(bodyParser.json());

//Routing
app.post('/api/login', function (req, res) {
    var user_name = req.body.username;
    var user_password = req.body.password;
    if (user_name && user_password) {
        db.collection('users').find({"username": user_name, "password": user_password}).toArray(function (err, user_stat) {
            console.log(user_stat);
            if (user_stat.length) {
                users.push(user_stat[0]);
                res.send({status: 1, message: ["Login ok"]});
            } else {
                res.send({status: 0, message: ["Wrong Email or Password"]});
            }
        });
    } else {
        res.send({status: 0, message: ["Either Email or Password field is blank"]})
    }
});

app.post('/api/register',function (req,res) {
    var user_name = req.body.username;
    var first_name = req.body.firstname; 
    var last_name = req.body.lasttname; 
    var email = req.body.email; 
    var password = req.body.password;
    var repassword = req.body.repassword;
    if (user_name && first_name && last_name && email && password && repassword && password == repassword) {
        db.collection('users').find({"username": user_name}).toArray(function (err,reg_user) {
            if (!reg_user.length) {
                //Username available continue Register
                db.collection('users').insert({"username": user_name, "firstname":first_name, "lastname": last_name, "email":email, "password":password});
                res.send({status: 1, message: ["Successfuly registered."]})
            }else{
                //Username NOT available return error
                res.send({status: 0, message: ["Username already exists. Try another one!!"]})
            }
        })
    } else {
        res.send({status: 0, message: ["All fields are required!!. Password and password confirmation must be the the same!."]})
    }
    
})


//connect to Mongo
var url = 'mongodb://localhost:27017/ourchat';
Mongoclient.connect(url, function (err, database) {
    db = database;
    if (!err) {
        console.log("connected to database");
        //Listening
        server.listen(3000, function () {
            console.log('Listening on port 3000....');
        })
        //end of listening
    } else {
        console.log("Not connected to database");
    }
})
//End Mongo connection
