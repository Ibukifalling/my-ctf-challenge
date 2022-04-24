const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const crypto = require('crypto')
const ejs = require('ejs')
const mongoose = require('mongoose')
const app = express()
const Router = require('./route')
const bodyParser = require('body-parser')
const user = require("./db/userdb")
const mongoDBpath = process.env.MONGODB_PATH ?? "mongodb://127.0.0.1:27017/";
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

// set header
app.use((req, res, next)=>{
    //res.header('X-Frame-Options', 'SAMEORIGIN');
    //res.header('Content-Security-Policy', 'default-src self;script-src self \'unsafe-inline\';style-src https://cdn.jsdelivr.net self');
    next();
})

const secret = crypto.randomUUID()
app.use(cookieParser(secret))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: secret, resave: false, saveUninitialized: false, cookie: {sameSite: 'lax'}}))

mongoose.connect(mongoDBpath).then(()=>{
    console.log("db connect")
}).catch((err) => {
    console.log(err)
})

// 必须加这个分号不然会有奇怪的解析导致错误....
// https://github.com/expressjs/express/issues/3515
app.use("/", Router);

(async () => {
    try {
        // await new user({username: "admin", password: process.env.ADMIN_PASS}).save()
        // await new note({author: "admin", title: "flag", content: process.env.FLAG, id: crypto.randomUUID()}).save()
        await user.updateOne({username: process.env.ADMIN_UNAME ?? "zbr", password: process.env.ADMIN_PASS ?? "zbrpassword"}, {username: process.env.ADMIN_UNAME ?? "zbr", password: process.env.ADMIN_PASS ?? "zbrpassword"}, {upsert: true})     //await oauth.updateOne({})
        console.log("admin init")
    }
    catch (e){
        console.log(e)
    }
})()

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Example app listening at http://0.0.0.0:${process.env.PORT ?? 3000}`)
})