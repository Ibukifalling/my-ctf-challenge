const express = require("express")
const router = express.Router()
const signin = require("./routes/signin")
const signup = require("./routes/signup")
const logout = require("./routes/logout")
const home = require("./routes/home")
const api = require("./routes/api")
const authorize = require("./routes/authorize")
const bot = require("./routes/bot")


router.get("/", home)
router.get("/signin", signin.getview)
router.get("/signup", signup.getview)
router.get("/logout", logout)
router.get("/oauth/authorize",authorize)
router.get("/oauth/api",api)
router.get("/letzbrseesee",bot.botpage)

router.post("/signin", signin.signin)
router.post("/signup", signup.signup)
router.post("/letzbrseesee", bot.visit)




module.exports = router
