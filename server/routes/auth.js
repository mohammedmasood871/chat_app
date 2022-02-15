module.exports = function (app, jwt) {

    app.get('', (req, res) => {
        req.db.get('users').find({}, {}, (e, data) => {
            console.log(data);
            res.send('welcome to our chat server' + data)

        })
    })

    // signup call 
    app.post('/register', (req, res) => {
        console.log(req.body)
        var data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }
        req.db.get('users').findOne({ email: req.body.email }, {}, (e, user) => {
            if (!user) {
                req.db.get("users").insert(data, (err, users) => {
                    if (err) {
                        res.send([{ "statuscode": 400, message: "failed" }])
                    } else {
                        res.send([{ "StatusCode": 200, message: "Success", "docs": users }])
                    }
                })
            } else {
                res.send([{ "statuscode": 400, message: "User Already Exist" }])

            }

        })


    })

    // Login

    app.post('/login', (req, res) => {
        var data = {
            email: req.body.email,
            password: req.body.password
        }
        jwt.sign({ email: req.body.email }, 'SecretKey', { expiresIn: '10s' }, function (err, token) {
            req.db.get('users').findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] }, {}, (err, log) => {
                if (log != null) {
                    res.json({ StatusCode: 200, message: "Success LoggedIn", docs: log, authtoken: token })

                } else {
                    res.json({ statuscode: 400, message: "Invalid Credential" })
                }
            })
        })
    })

    // users list 

    app.get('/userlist/:id', (req, res) => {

      
                req.db.get('users').find({ _id: { $ne: req.params.id } }, {}, (e, data) => {
                    console.log(data);
                    res.json(data)

                })
            }

        )




    // user find
    app.get('/userfind/:id', (req, res) => {
       
                req.db.get('users').findOne({ _id: req.params.id }, {}, (e, data) => {
                    console.log(data, 'user data');
                    res.json(data)

                })
       

    })

    // chat data
    app.post('/chat', (req, res) => {

        req.db.get('chatdata').findOne({
            userIds: {
                $in: [req.body.senderId,
                req.body.recevierId]
            }
        }, {}, (e, chatdata) => {
            console.log(chatdata, 'new data');
            if (!chatdata) {
                var chat_object = {
                    userIds: [req.body.senderId,
                    req.body.recevierId],
                    chatArray: [{
                        senderId: req.body.senderId,
                        message: req.body.message,

                        read: false

                    }]


                }
                req.db.get("chatdata").insert(chat_object, (e, inserted) => {
                    console.log("inserted", inserted)
                })

            } else {
                var chat_object = {
                    senderId: req.body.senderId,
                    message: req.body.message,
                    read: false
                }
                req.db.get("chatdata").update({
                    userIds: {
                        $in: [req.body.senderId,
                        req.body.recevierId]
                    }
                }, { $push: { chatArray: chat_object } }, { new: true }, (e, inserted) => {
                    console.log("inserted", inserted)
                })


            }

        })

    })


    // getChatData

    app.get('/chatdata/:senderId/:recevierId', (req, res) => [
        req.db.get('chatdata').findOne({
            userIds: {
                $in: [req.params.senderId,
                req.params.recevierId]
            }
        }, {}, (e, chatdata) => {
            res.json({ data: chatdata })

        })
    ])

   
}