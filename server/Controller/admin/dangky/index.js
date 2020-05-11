const express = require("express");
const router = express.Router();
const squel = require("squel").useFlavour("postgres");
const query = require("../../../connection/Connection");
const md5 = require('md5');

router.get("/", async (req, res) => {
  try {
    let sql = squel.select()
      .from("tbl_login")
      .field("id_login")
      .field("user_login")
      .field("pass_login")
      .toString()
    let danhsach = await query(sql);
    console.log({ req });
    let send = {
      ds: danhsach.rows,
      message: req.flash('message')
    }
    res.render("./admin/dangky/index.ejs", send);
  } catch (error) {
    res.send("error -- 500");
    res.end();
    console.log(error);
  }
});
//insert
router.post("/insert", express.urlencoded({ extended: true }), async (req, res) => {
  try {
    let username = req.body.UserName;
    // console.log(username);

    let pass = md5(req.body.Password)
    // console.log(pass);

    let sql = squel.insert()
      .into("tbl_login")
      .set("user_login", username)
      .set("pass_login", pass)
      .toString()
    let result = await query(sql);
    // console.log(result);
    req.flash('message', 'Thất Bại');
    res.redirect("/login")
  } catch (error) {
    res.send("error --- 500");
    res.end();
    console.log(error);

  }
});

module.exports = router;