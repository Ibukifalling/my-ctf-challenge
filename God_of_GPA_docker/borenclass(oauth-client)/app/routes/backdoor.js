const ADMIN_UNAME = process.env.ADMIN_UNAME ?? "zbr"
const student = require("../db/studentdb")

const backdoorpage = async (req, res) => {
    if(req.session.user.username!==ADMIN_UNAME){
        res.send("这里可是zbr专属的后门通道！想啥呢！")
        return
    }
    res.sendFile("views/backdoorpage.html", {root: __dirname + "/.."})
    return
}

const cheat = async (req, res) => {
    if(req.session.user.username!==ADMIN_UNAME){
        res.send("这里可是zbr专属的后门通道！想啥呢！")
        return
    }
    cheater = req.body.cheater
    let result = await student.find({name: cheater})
    if(!result.length > 0){
        res.send("查无此人")
        return
    }
    var whereStr = {"name": cheater};  // 查询条件
    var updateStr = {$set: { "score1" : 100,"score2" : 100,"score3" : 100,"score4" : 100, "comment":`赵校长觉得你很棒,这是给你的礼物：${process.env.FLAG??'MRCTF{this_is_a_test_flag_please_contact_ibukifalling}'}`}};
    student.updateOne(whereStr, updateStr).then(rel => {
        // rel为修改结果对象
        console.log(rel);
      })
    res.send("cheat success!")
    return
}

module.exports = {
    backdoorpage: backdoorpage,
    cheat: cheat
}