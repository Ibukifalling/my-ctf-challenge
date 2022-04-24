const clienturl = process.env.OAUTH_CLIENT_URL ?? "http://127.0.0.1:3001/"
const serverurl = process.env.OAUTH_SERVER_URL ?? "http://127.0.0.1:3000/"
const puppeteer = require('puppeteer')

const botpage = async (req, res) => {
    res.sendFile("views/bot.html", {root: __dirname + "/.."})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const visit = async (req, res) => {
    let uuid = req.body.uuid
    if(!uuid.match(/\w{8}(-\w{4}){3}-\w{12}/)){
        res.send("只填写uuid哦")
        return
    }
    let article = clienturl+'view/'+uuid
    console.log(`[+]article uri: ${article}`)
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--headless',
                '--disable-setuid-sandbox'
            ]
        });
        const loginpage = await browser.newPage()
        await loginpage.goto( serverurl+"signin")
        await loginpage.type("input[name=username]", process.env.ADMIN_UNAME ?? "zbr")
        await loginpage.type("input[name=password]", process.env.ADMIN_PASS ?? "zbrpassword")
        await Promise.all([
            loginpage.click('button[name=submit]'),
            loginpage.waitForNavigation({waitUntil: 'networkidle0', timeout: 2000})
        ])
        await loginpage.goto("about:blank")
        await loginpage.close()

        // const testpage = await browser.newPage()
        // let testarticle = "http://borenclass:3001/"+'view/'+uuid

        // await testpage.goto(testarticle, {waitUntil: 'networkidle0', timeout: 2000})

        const page = await browser.newPage()
  
        await page.goto(article, {waitUntil: 'networkidle0', timeout: 2000})

        await delay(3000) /// waiting 5 second.

    }catch (e) {
        console.log(e)
        return
    }
    res.send("博人说他一定会好好康康你的垃圾话")
    return 
    
}

module.exports = {
    botpage: botpage,
    visit: visit
}