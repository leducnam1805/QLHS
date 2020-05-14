const router_index = require("./admin/index");
const router_dangnhap = require("./admin/dangnhap/index");
const router_dangky = require("./admin/dangky/index");
const router_taikhoan = require("./admin/taikhoan/index");

let main = (app) => {
  app.use("/admin", router_index);
  app.use("/dangnhap", router_dangnhap);
  app.use("/dangky", router_dangky);
  app.use("/QLTaiKhoan", router_taikhoan);
}
module.exports = main;