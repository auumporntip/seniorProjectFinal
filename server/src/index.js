const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  next();
});

app.use('/api/',require('./routes/menu.js'))

app.listen(3000, () => {
  console.log('Example app listening at http://%s:%s');
})

