const student = require("../db/studentdb")
const ADMIN_UNAME = process.env.ADMIN_UNAME ?? "zbr" 

const getGPA = async (req, res) => {
    if (!req.session.user) {
        // res.set("refresh", "1;url=/signin")
        // res.send("login first!")
        res.send('login first!<script>setTimeout(function(){location.href="/login"},1000) </script>')
        return
    }


    let result = await student.find({name: req.session.user.username})   // 查自己的成分

    res.render("getGPA", {student: result[0]})
}

module.exports = getGPA