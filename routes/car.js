const { Router } = require("express");
const {
  carsGet,
  carGet,
  carNewGet,
  carNewPost,
} = require("../controllers/cars");

const carRouter = Router();

carRouter.get("/", carsGet);
carRouter.get("/new", carNewGet);
carRouter.post("/new", carNewPost);
carRouter.get("/view/:id", carGet);

module.exports = carRouter;
