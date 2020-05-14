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
      errormessage: req.flash('errormessage'),
      successmessageedit: req.flash('successmessageedit')
    }
    res.render("./admin/taikhoan/index.ejs", send);
  } catch (error) {
    res.send("error -- 500");
    res.end();
    console.log(error);
  }
});
//insert
router.post("/insert", express.urlencoded({ extended: true }), async (req, res) => {
  try {
    let username = req.body.ten_taikhoan;
    let pass = md5(req.body.pass_taikhoan);
    if (req.body.ten_taikhoan == '' || req.body.ten_taikhoan == null || req.body.ten_taikhoan == undefined) {
      req.flash('errormessage', 'Thất Bại');
      res.redirect("/QLTaiKhoan")
    } else {
      let sql = squel.insert()
        .into("tbl_login")
        .set("user_login", username)
        .set("pass_login", pass)
        .toString()
      await query(sql);
      req.flash('successmessage', 'Thành Công');
      res.redirect("/QLTaiKhoan")
    }
  } catch (error) {
    res.send("error --- 500");
    res.end();
    console.log(error);
  }
});
//views edit
router.post("/viewsedit", express.urlencoded({ extended: true }), async (req, res) => {
  try {
    let { idtk } = req.body;
    if ((idtk != undefined) && (idtk != "")) {
      let sql = squel.select()
        .from("tbl_login")
        .field("id_login")
        .field("user_login")
        .where("id_login =" + idtk)
        .toString()
      let rs = await query(sql);
      let ob_hs = rs.rows[0];
      res.send(ob_hs);
      req.flash('successmessage', 'Thành công');
    } else {
      req.flash('errormessage', 'Thất Bại');
      res.redirect("/QlTaiKhoan")
    }
  } catch (error) {
    res.end();
    console.log(error);
    res.send("error --- 500")
  }
});
//views edit
//edit
router.post("/edittk", async (req, res) => {
  try {
    let { idtk } = req.body;
    if ((idtk != undefined) && (idtk != "")) {
      let sql = squel.select()
        .from("tbl_login")
        .field("id_login")
        .field("user_login")
        .field("pass_login")
        .where("id_login =" + idtk)
        .toString()
      let rs = await query(sql);
      let ob_hs = rs.rows[0];
      res.send(ob_hs);
      req.flash('successmessage', 'Thành công');
    } else {
      req.flash('errorMessage', 'Thất Bại');
      res.redirect("/Ql_Taikhoan")
    }

  } catch (error) {
    res.end();
    console.log(error);
    res.send("error --- 500")
  }
});
router.post("/edit", async (req, res) => {
  try {
    let {
      id_taikhoan,
      name_taikhoan,
    } = req.body;
    let pass = md5(req.body.pass_taikhoan)
    let sql = squel.update()
      .table("tbl_login")
      .set("user_login", name_taikhoan)
      .set("pass_login", pass)
      .where("id_login =" + id_taikhoan)
      .toString()
    let result = await query(sql);
    req.flash('successmessageedit', 'Thành công');
    res.redirect("/QLTaiKhoan")
  } catch (error) {
    res.send("error --- 500");
    res.end();
    console.log(error);

  }
});
//edit
// del
router.delete("/del", async (req, res) => {
  try {
    let { idtk } = req.body;
    if ((idtk != undefined) && (idtk != "")) {
      let sql = squel.delete()
        .from("tbl_login")
        .where("id_login =" + idtk)
        .toString()
      await query(sql)
      res.send({ "thongbao": "success" });
    } else {
      req.flash('errorMessage', 'Thất Bại');
      res.redirect("/QlTaiKhoan")
    }
  } catch (error) {
    res.send("error --- 500");
    res.end();
    console.log(error);
  }
})
// del 
module.exports = router;