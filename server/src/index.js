
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

app.use('/api/',require('./routes/account'))
app.use('/api/',require('./routes/menu.js'))
app.use('/api/',require('./routes/category'))
app.use('/api/',require('./routes/restaurant'))
app.use('/api/',require('./routes/typeOfRestaurant'))
app.use('/api/',require('./routes/transaction'))
app.use('/api/',require('./routes/bill'))
app.use('/api/',require('./routes/employee'))
app.use('/api/',require('./routes/status'))
app.use('/api/',require('./routes/notification'))
app.use('/api/',require('./routes/typeOfService'))
app.use('/api/',require('./routes/employee'))
app.use('/api/',require('./routes/menuservice'))

app.use('/api/',require('./routes/authen'))
app.use('/api/',require('./upload/upload'))

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000');
})

