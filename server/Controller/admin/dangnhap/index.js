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
    let send = {
      ds: danhsach.rows,
      successmessage: req.flash('successmessage'),
      errormessage: req.flash('errormessage')
    }
    res.render("./admin/dangnhap/index.ejs", send);
  } catch (error) {
    res.send("error -- 500");
    res.end();
    console.log(error);
  }
});
//auth
router.post("/auth", async (req, res) => {
  try {
    let username = req.body.username;
    let pass = md5(req.body.password)
    let sql = squel.select()
      .field("count(id_login)")
      .from("tbl_login")
      .where("user_login = '" + username + "'")
      .where("pass_login = '" + pass + "'")
      .toString()
    let danhsach = await query(sql)
    if (danhsach.rows[0].count > 0) {
      req.flash('successmessage', 'Thành Công');
      // res.redirect("/admin")
    } else {
      req.flash('errormessage', 'Thất Bại');
      res.redirect("/dangnhap")
    }
  } catch (error) {
    res.send("error --- 500");
    res.end();
    console.log(error);
  }
});

module.exports = router;