
const home = async (req, res) =>{
    if(!req.session.user) {
        // res.set("refresh", "1;url=/signin")
        // res.send("login first!")
        res.send('login first!<script>setTimeout(function(){location.href="/signin"},1000) </script>')
        return
    }

    res.render("index", {username: req.session.user.username})

}



module.exports = home