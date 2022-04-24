const token = require ("../db/token")
const SECRET = "ibukifallingsayyouwillneverknowthissecrethahahaha"

const api = async (req, res) => {
    let requestSecret = req.query.secret
    let requestToken = req.query.token
    if (requestSecret!==SECRET){
        res.send("You want to do something bad?There is no way for you.")
        return
    }

    let result = await token.find({token: requestToken})   // 查找token

    if (result.length > 0)
    {
        var username = result[0].username
        var obj = {
            username: username,
            message: "access"
        }
        //res.send('{"username":"'+username+'"}')
        res.json(obj)

    } else {
        res.send("Token error!")
    }

    //res.send('authorize success<script>setTimeout(function(){location.href="'+redirect_uri+'?token='+token+'"},1000) </script>')
}

module.exports = api
