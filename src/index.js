const express = require('express')
const app = express()
app.get('/', function(req, res) {
  res.send('config/template.html')
})
app.listen(3000)
require("./bot.js")