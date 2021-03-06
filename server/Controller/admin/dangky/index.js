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
    let pass = md5(req.body.Password)
    if (req.body.UserName == '' || req.body.UserName == null || req.body.UserName == undefined) {
      req.flash('errormessage', 'Thất Bại');
      res.redirect("/dangky")
    } else {
      let sql = squel.insert()
        .into("tbl_login")
        .set("user_login", username)
        .set("pass_login", pass)
        .toString()
      await query(sql);
      req.flash('successmessage', 'Thành Công');
      res.redirect("/dangky")
    }
  } catch (error) {
    res.send("error --- 500");
    res.end();
    console.log(error);
  }
});

module.exports = router;