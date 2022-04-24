# [MRCTF2022]God of GPA 题目环境

题目由数据库和两个Web（博仁课堂&博仁科技统一身份认证）组成

使用docker-compose起环境时请更改.yml文件中`OAUTH_CLIENT_URL`和`OAUTH_SERVER_URL`为对应域名

## 注意事项

- 直接在本地使用docker-compose搭建环境且url直接填写localhost会导致页面交互出现问题。

- 如果没有域名，可以将两个Web文件夹中app.js文件内的mongoDBpath改为本地的mongoDB路径，然后分别`npm install`&`node app.js`，源码内默认以http://127.0.0.1:3000/为serverurl，以http://127.0.0.1:3001/为clienturl

- 题目实际上平台后有过微调，这里放出的是本地测试用的版本，如果出现什么奇奇怪怪的问题是非常正常的>-<

  

  