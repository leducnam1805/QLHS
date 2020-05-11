const router_index = require("./admin/index");
const router_login = require("./admin/login/index");
const router_dangky = require("./admin/dangky/index");

let main = (app) => {
  app.use("/admin", router_index);
  app.use("/login", router_login);
  app.use("/dangky", router_dangky);
}
module.exports = main;