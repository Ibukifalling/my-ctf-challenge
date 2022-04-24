const oauthtoken = require ("../db/token")

function create_token(leng){
    leng = leng==undefined?32:leng	//如果没设置token长度自动为32位
 //预设随机字符串
 let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
 let token = ''
 //以长度单位进行循环
 for(let i=0;i<leng;++i){
     token+=chars.charAt(Math.floor(Math.random()*chars.length))
 }
 return token	///返回之前使用md5加密一下
}


const authorize = async (req, res) => {
    if (!req.session.user) {
        // res.set("refresh", "1;url=/signin")
        // res.send("login first!")
        res.send('login first!<script>setTimeout(function(){location.href="/signin"},1000) </script>')
        return
    }

    let redirect_uri = req.query.redirect_uri
    if(!redirect_uri){
        res.send("cannot get param redirect_uri")
        return 
    }
    const clienturl = process.env.OAUTH_CLIENT_URL ?? "http://127.0.0.1:3001/"
    var regexp = clienturl.replace(".","\\.")
    var regexp = clienturl.replace("/","\\/")
    var reg = new RegExp(`^${regexp}`,"gi");
    var r = redirect_uri.match(reg)
    console.log(r)
    if(!r){
        res.send("redirect_uri unmatched")
        return
    }
    let result = await oauthtoken.find({username: req.session.user.username})   // 只能查找自己的note
    // let data = []
    // for (let n of result) {
    //     if (n.content.indexOf(query) !== -1) {
    //         data.push(n)
    //     }
    // }
    if (!result.length > 0)  // 未找到和user绑定的token时生成对应的token
    {
        var token = create_token()
        console.log("[+]token created:",token)
        console.log("[+]combined user:",req.session.user.username)
        let temp = new oauthtoken({
            username: req.session.user.username,
            token: token
        })
        temp.save().catch((err) => {
            console.log(err)
        })

    } else {
        var token=result[0].token
        console.log("[+]result:",result)
    }

    res.send('authorize success<script>setTimeout(function(){location.href="'+redirect_uri+'?token='+token+'"},1000) </script>')
}

module.exports = authorize
