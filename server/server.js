/* global db */

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
var users_online = [];
var Client;
var users_objects = [];
var flag = 0;
var users_really_online = [];

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//Routing
app.post('/api/login', function (req, res) {
    var user_name = req.body.username;
    var user_password = req.body.password;
    if (user_name && user_password) {
        db.collection('users').find({"username": user_name, "password": user_password}).toArray(function (err, user_stat) {
//            console.log(user_stat);
            if (user_stat.length) {
                users.push(user_stat[0]);
                res.send({status: 1, message: ["Login ok"]});
            } else {
                res.send({status: 0, message: ["Wrong Email or Password"]});
            }
        });
    } else {
        res.send({status: 0, message: ["Either Email or Password field is blank"]});
    }
});

app.post('/api/register', function (req, res) {
    var user_name = req.body.username;
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var repassword = req.body.repassword;
//     console.log(user_name , first_name , last_name, email, password);
    if (user_name && first_name && last_name && email && password) {
        db.collection('users').find({"username": user_name}).toArray(function (err, reg_user) {
            if (!reg_user.length) {
                //Username available continue Register
                db.collection('users').insert({"username": user_name, "firstname": first_name, "lastname": last_name, "email": email, "password": password});
                res.send({status: 1, message: ["Successfuly registered."]})
            } else {
                //Username NOT available return error
                res.send({status: 0, message: ["Username already exists. Try another one!!"]})
            }
        })
    } else {
        res.send({status: 0, message: ["All fields are required!!. Password and password confirmation must be the the same!."]});
    }

});

app.get('/api/active_users', function (req, res) {
    db.collection('users').find({}).toArray(function (err, active_users) {
        console.log('active: ', active_users);
        console.log(active_users.length)
        if (active_users.length) {
            res.send({status: 1, message: active_users});
        } else {
            res.send({status: 0, message: ["No online users"]});
        }
    });
});

app.get('/api/get_user_info', function (req, res) {
    db.collection('users').find({'username': req.query.username}, {firstname: 1, lastname: 1, _id: 0}).toArray(function (err, user_info) {
        if (user_info.length) {
            res.send({status: 1, message: user_info});
        } else {
            res.send({status: 1, message: ["No user with the provided username was found."]});
        }
    });
});

//End of routing

//Socket
io.on('connection', function (client) {
    console.log("new client connected with id: " + client.id);
    function fill_array() {
        users_really_online = [];
        for (var i = users_online.length - 1; i >= 0; i--) {
            if (users_online[i].status == 'online') {
                users_really_online.push(users_online[i]);
            }
        }
    };
    client.on('signin', function (client_name, userstatus) {
        users_really_online = [];
        var userobj = {'id': client.id, 'name': client_name, 'status': userstatus};
        for (var i = users_online.length - 1; i >= 0; i--) {
            if (users_online[i].name == client_name) {
                users_online[i].id = client.id;
                users_objects[i].socketclient = client;
                flag = 1;
                break;
            }
        }
        ;
        if (flag == 0) {
            users_online.push(userobj);
            users_objects.push({'socketclient': client, 'name': client_name});
        }
        ;
        fill_array();
        


        client.emit('get_online_users', users_really_online);
        console.log(users_really_online);
        client.broadcast.emit('get_online_users', users_really_online);
        //reciving from client the name of reciver in private chat
        client.on('reciver', function (reciver_user) {
            console.log('jjjhhh', reciver_user, users_really_online);
            // check if they have a colliction on the database or not
            for (var i = users_really_online.length - 1; i >= 0; i--) {
                if (users_really_online[i].name == reciver_user) {
                    reciver_user_id = users_really_online[i].id
                }
                if (users_really_online[i].id == client.id) {
                    sender_name = users_really_online[i].name
                }
            }
            var names = [reciver_user, sender_name];
            var collection_name = names.sort()[0].concat(names.sort()[1]);
            var container = {};
            //storing a variable in window to access it's value

            // to get soket of reciver
            for (var i = users_objects.length - 1; i >= 0; i--) {
                if (users_objects[i].name == reciver_user) {
                    var reciver_socket = users_objects[i].socketclient;
                }
            }
            //to add a collection by their name in database and save the messages
            db.createCollection(collection_name, {strict: true}, function (error, collection) {

                container [collection_name + 'collection'] = [];
                //by opening the private chat template the history messages will be in
                db.collection(collection_name).find().toArray(function (err, private_msgs) {
                    reciver_socket.emit("private_stored_msgs", private_msgs);
                    client.emit("private_stored_msgs", private_msgs);
                });
            });
            //reciving single messages from private chat
            client.on('message_from_client_private', function (msg, sender) { // handle the event
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
//                    console.log('the sended message',msg);
                senderobj = {'name': sender, 'message': msg, 'date': date, 'time': time};
                container [collection_name + 'collection'].push(senderobj);
//                    console.log('check your data',container [collection_name + 'collection'])
                db.collection(collection_name).insert(senderobj);
                db.collection(collection_name).find({'date': date}).limit(10).sort({'_id': -1}).toArray(function (err, room_msgs) {
                    reciver_socket.emit("messages_from_server", room_msgs.reverse());
                    client.emit("private_stored_msgs", room_msgs);
                });
            })

        });
    });
    client.on('message_from_client', function (msg, sender) { // handle the event
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(msg);
        senderobj = {'name': sender, 'message': msg, 'date': date, 'time': time};
        messages.push(senderobj);
        db.collection('room_messages').insert(senderobj);
        db.collection('room_messages').find({'date': date}).limit(10).sort({'_id': -1}).toArray(function (err, room_msgs) {
            client.broadcast.emit("messages_from_server", room_msgs.reverse());
            client.emit("messages_from_server", room_msgs);
        });
        // client.broadcast.emit("messages_from_server",messages)
        // client.emit("messages_from_server",messages)
    })


    client.on('enter_chat_room', function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        db.collection('room_messages').find({'date': date}).limit(10).sort({'_id': -1}).toArray(function (err, room_msgs) {
            client.emit('messages_from_server', room_msgs.reverse()); // fire the event

        });
    });

    client.on('toggle_state', function () {
        for (var i = users_online.length - 1; i >= 0; i--) {
            if (users_online[i].id == client.id) {
                if (users_online[i].status == 'online') {
                    users_online[i].status = 'offline';
                } else {
                    users_online[i].status = 'online';
                }

                break;
            }
        }
        fill_array();
        client.emit('get_online_users', users_really_online);
        client.broadcast.emit('get_online_users', users_really_online);
        console.log(users_really_online);

    })

    client.on('disconnect', function () {
        console.log("Disconnected", client.id);
        for (var i = users_online.length - 1; i >= 0; i--) {
            if (users_online[i].id == client.id) {
                users_online.splice(i, 1);
                users_objects.splice(i, 1);
                break;
            }
        }
        ;
    })


})

//End Socket

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
