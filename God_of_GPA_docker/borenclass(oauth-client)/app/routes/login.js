const student = require("../db/studentdb")
const axios = require("axios")
const SECRET = "ibukifallingsayyouwillneverknowthissecrethahahaha"
const serverurl = process.env.OAUTH_SERVER_URL ?? "http://127.0.0.1:3000/"
const clienturl = process.env.OAUTH_CLIENT_URL ?? "http://127.0.0.1:3001/"

const login = async (req, res) => {
    for (let v in req.body) {
        req.body[v] = req.body[v].replace(/\s*/g, "");
    }

    const requestToken = req.query.token;
    if(!requestToken){
      res.render("login", {serverurl: serverurl,clienturl: clienturl})
        return
    }
    console.log('authorization code:', requestToken);

    const tokenResponse = await axios({
    method: 'get',
    url: `${serverurl}` +
      `oauth/api?` +
      `secret=${SECRET}&` +
      `token=${requestToken}`,
      headers: {
        accept: 'application/json'
      }
  });

  console.log(tokenResponse);
  const username = tokenResponse.data.username;
  let result = await student.find({name: username})
  if (!result.length > 0){//创建学生账号
    let temp = new student({
        name: username,
        score1: 52,
        score2: 44,
        score3: 39,
        score4: 47,
        comment: "成绩这么烂，含想要flag？"
    })
    temp.save().then((data) => {
        console.log(`create student ${username}`)
    }).catch((err) => {
        console.log(err)
    })
  }
  req.session.user = {username: username}

  res.send(`你好， ${req.session.user.username}同学!<script>setTimeout(function(){location.href="/"},1000) </script>`)
}


module.exports = login