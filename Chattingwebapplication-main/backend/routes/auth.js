const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/userschema');
const Message = require('../model/messageschema')
var nodemailer = require('nodemailer');
const Conversation = require('../model/Conversationschema');
const { application } = require('express');
// const { useNavigate } = require('react-router-dom');
const router = express.Router();
router.get('/', (req, res) => {
    res.send(`hello world from the  router server`)
});
router.post('/newchat', async(req, res) => {
    const { sender, reciver } = req.body;
    try {
        const userexit = await User.findOne({ username: sender });
        userexit.friends.push(reciver);
        await userexit.save();
        return res.status(200).json(userexit);
    } catch (err) {
        console.log(err);
    }
})
router.post('/chat', async(req, res) => {
    const { sender, reciver } = req.body;
    try {
        const me = await Conversation.findOne({
            $or: [{
                members: [sender, reciver],
            }, {
                members: [reciver, sender]
            }]
        });
        // console.log(me);
        return res.status(200).json(me);
    } catch (err) {
        console.log(err);
    }
})

router.post('/deletemsg', async(req, res) => {
    const { sender, reciver, message_id } = req.body;
    console.log(req.body);
    try {
        const me = await Conversation.findOne({
            $or: [{
                members: [sender, reciver],
            }, {
                members: [reciver, sender]
            }]
        });
        const mes = me.all_messages;
        console.log(mes.length)
        console.log("-----------------------------------------------------------------")
        for (let i = 0; i < mes.length; i++) {
            if (mes[i].message_id === message_id) {
                mes.splice(i, 1);
                i--
            }

        }
        if (me.last_message.message_id === message_id) {

            me.last_message = mes[mes.length - 1];
        }
        console.log(mes.length)
        me.all_messages = mes;
        await me.save()
        return res.status(200).json(me);
    } catch (err) {
        console.log(err);
    }
})
router.post('/deleteallmsg', async(req, res) => {
    const { sender, reciver } = req.body;
    console.log(req.body);
    try {
        const me = await Conversation.findOne({
            $or: [{
                members: [sender, reciver],
            }, {
                members: [reciver, sender]
            }]
        });
        console.log(me);
        me.all_messages = [];
        await me.save();
        // const result = Conversation.deleteOne({ _id: me._id });
        return res.status(200).json(me);
    } catch (err) {
        console.log(err);
    }
})
router.post('/allusers', async(req, res) => {
    try {
        const users = await User.find();

        console.log(users);
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
})
router.post('/send', async(req, res) => {
    // console.log("register form node");
    // console.log(req.body)
    const { sender, reciver, text } = req.body;
    console.log(text)
    try {
        const userexit = await User.findOne({ username: sender });
        if (userexit) {
            const con = await Conversation.findOne({
                $or: [{
                    members: [sender, reciver]
                }, {
                    members: [reciver, sender]
                }]
            })
            if (con) {
                console.log(con)
                const ts = Date.now();
                const datetime = new Date(ts);
                const year = datetime.getFullYear();
                const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
                const day = ("0" + datetime.getDate()).slice(-2);
                const hour = datetime.getHours();
                const minute = datetime.getMinutes();
                const second = datetime.getSeconds();
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const message_id = jwt.sign({ time: Date(), sender: sender }, jwtSecretKey);
                const message1 = new Message({ message_id, sender, text, year, month, day, hour, minute, second });
                con.all_messages.push(message1)
                con.last_message = message1;
                console.log(con)
                await con.save()
                return res.status(402).json({ message: "already exit" });
            } else {
                const ts = Date.now();
                const datetime = new Date(ts);
                const year = datetime.getFullYear();
                const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
                const day = ("0" + datetime.getDate()).slice(-2);
                const hour = datetime.getHours();
                const minute = datetime.getMinutes();
                const second = datetime.getSeconds();
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const message_id = jwt.sign({ time: Date(), sender: sender }, jwtSecretKey);
                const message1 = new Message({ message_id, sender, text, year, month, day, hour, minute, second });
                const conver = new Conversation({
                    members: [sender, reciver],
                    last_message: message1,
                    all_messages: message1,
                })
                await conver.save();
                return res.status(402).json({ message: "register sucessfully" });
            }

        } else {
            return res.status(402).json({ message: "user not exits" });
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/register', async(req, res) => {
    // console.log("register form node");
    const { username, email, password, PhoneNumber } = req.body;
    try {
        const userexitphone = await User.findOne({
            PhoneNumber: PhoneNumber
        });
        const userexitemail = await User.findOne({
            email: email
        });
        const userexitname = await User.findOne({
            username: username
        })
        if (userexitphone) {
            return res.status(402).json({ message: "PhoneNumber" });
        } else if (userexitemail) {
            return res.status(402).json({ message: "email" });
        } else if (userexitname) {
            return res.status(402).json({
                message: "username"
            });
        } else {
            // console.log("create user")
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const user_id = jwt.sign({ email: email }, jwtSecretKey);
            const profile_url = "./Images/temp.jpg";
            const user = new User({ user_id, username, email, PhoneNumber, password, profile_url });
            //  hasing of password before save
            await user.save();
            return res.status(402).json(user);
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/login', async(req, res) => {
    const { PhoneNumber, password } = req.body;
    let token;
    try {
        const userlogin = await User.findOne({ PhoneNumber: PhoneNumber });
        if (!userlogin) {
            return res.status(400).json({
                error: "user not exits"
            });
        } else {
            const ismatch = await bcrypt.compare(password, userlogin.password);
            if (!ismatch) {

                return res.status(400).json({ error: "password not valid" });

            } else {
                // token = await userlogin.generateAuthToken();
                res.status(201).json(userlogin);
                // navigate("/");
            }
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/forgottenpassword', (req, res) => {
    const {
        email
    } = req.body
    console.log(email);
    try {
        // const olduser = await User.findOne({ email: email });
        // if (!olduser) {
        //     return res.json({ message: "user not exits" })
        // }
        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({
            email: "keyurpatel1149@gmail.com",
            id: "xyz",
        }, secret, {
            expiresIn: "15s"
        });

        // const link = `http://localhost:8080/resetpassword/${olduser.user_id}/${token}`;
        var trasporter = nodemailer.createTestAccount({
            service: 'gmail',
            auth: {
                user: '20ceuog027@ddu.ac.in',
                password: 'keyurddu'
            }
        });
        console.log(trasporter);
        var mailOptions = {
            from: '20ceuog027@ddu.ac.in',
            to: 'khushalvadher229@gmail.com',
            subject: 'Reset Password',
            text: 'link'
        };

        trasporter.sendMail(mailOptions, function(error, info) {
            console.log("keyur");
            if (error) {
                console.log(error);
            } else {
                console.log('Mail Sent :' + info.responce);
            }
        });
        console.log(link);
        // return res.json({ message: "check your mail box" })
    } catch (err) {
        console.log(err);

    }

});
router.get("/resetpassword/:id/:token", async(req, res) => {
    const { user_id, token } = req.params;
    const { password } = req.body;

    const olduser = await User.findOne({ user_id: user_id });
    if (!olduser) {
        returnres.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET_KEY + olduser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encyptedpass = await bcrypt.hash(password, 10);
        await User.updateOne({
            user_id: user_id
        }, {
            $set: {
                password: encyptedpass,
            },
        });
        res.json({ status: "Password Updated" });
        res.render()
    } catch (err) {
        console.log(err);
        res.json({ status: "Something Went Wronge" });
    }

});

module.exports = router;