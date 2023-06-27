const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const app = express();
const port = 8080;
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'user',
  httpOnly:true,
  sameSite:'strict',
  secret:'thisisatest'
}))

app.post('/login', (req, res) => {
  req.session.username = req.body.username
  let data = req.session.username
  res.status(200).send(`${data} added!`)
})

app.get('/hello', (req, res) => {
  var username = req.body.username
  console.log(username)
  if(username === req.session.username){
    res.status(200).send(`Welcome ${username}!`)
  }else{
    res.status(200).send(`Access Denied`)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})