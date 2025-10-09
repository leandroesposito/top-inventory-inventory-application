const { Router } = require("express");
const {
  carsGet,
  carGet,
  carFormGet,
  carFormPost,
  carEdit,
  carDeleteGet,
  carDeletePost,
} = require("../controllers/cars");

const carRouter = Router();

carRouter.get("/", carsGet);
carRouter.get("/new", carFormGet);
carRouter.post("/new", carFormPost);
carRouter.get("/view/:id", carGet);
carRouter.get("/edit/:id", carEdit);
carRouter.get("/delete/:id", carDeleteGet);
carRouter.post("/delete/:id", carDeletePost);

module.exports = carRouter;
