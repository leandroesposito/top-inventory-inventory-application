const { Router } = require("express");
const {
  carsGet,
  carGet,
  carFormGet,
  carFormPost,
} = require("../controllers/cars");

const carRouter = Router();

carRouter.get("/", carsGet);
carRouter.get("/new", carFormGet);
carRouter.post("/new", carFormPost);
carRouter.get("/view/:id", carGet);

module.exports = carRouter;
