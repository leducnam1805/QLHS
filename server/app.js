const express = require("express");
const app = express();
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");


if (!process.env.PM2) {
  const env = require("dotenv").config({ path: '../config/.env' })
}
const bodyParser = require('body-parser')
const fileroot = require("app-root-path");

const routermain = require("./controller/routermain");

// lệnh cấu hình thư mục view
app.set("view engine", "ejs");
app.set("views", "../client/views");


// cấu hình thư mục public
app.use(express.static(fileroot + "/client/public"));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.use(cookieParser());
app.use(flash());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

routermain(app);

app.listen(process.env.PORT, () => {
  console.log("Server running at port: " + process.env.PORT);
});

