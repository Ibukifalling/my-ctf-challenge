const note = require("../db/notedb")
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const view = async (req, res) => {
   
    let n = await note.findOne({id: req.params.id})
    console.log(`dirty:${n.content}`)

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(n.content);
    console.log(`cleaned:${clean}`)
    if (n) {
        res.send(`
        <!DOCTYPE html>
<html>
<head>
    <title>博人树洞</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>博人树洞</h1>
  <div>
    ${clean}
  </div> 
  <script>
    let Img =  window.MyImg || {src: 'https://md.buptmerak.cn/uploads/upload_d12a3804a813ffb14fe38a318d6bfcf1.png'}
    let Container = document.createElement("div");
    Container.innerHTML = '<img class="avatar" src="' + Img.src + '">';
    document.body.appendChild(Container);
  </script>
  <h2>Zbr is watching you!</h2>
  <!-- 本来想写一个很酷炫的前端效果的嘤嘤qwq，但是出题人是渣渣捏。。。 -->
</body>
</html>
               `)
    } else {
        res.send("note doesn't exist")
    }
}

module.exports = view