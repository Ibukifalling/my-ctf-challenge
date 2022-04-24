const express = require("express")
const router = express.Router()

const logout = require("./routes/logout")
const home = require("./routes/home")
const login = require("./routes/login")
const view = require("./routes/view")
const create = require("./routes/create")
const getGPA = require("./routes/getGPA")
const backdoor = require("./routes/backdoor")

router.get("/", home)
router.get("/logout", logout)
router.get("/login", login)
router.get("/create", create.geteditor)
router.get("/view/:id", view)
router.get("/getGPA", getGPA)
router.get("/backdoor",backdoor.backdoorpage)


router.post("/create", create.postnote)
router.post("/backdoor",backdoor.cheat)

module.exports = router
