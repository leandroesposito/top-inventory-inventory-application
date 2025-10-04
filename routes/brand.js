const { Router } = require("express");
const brandsController = require("../controllers/brands");

const brandRouter = Router();

brandRouter.get("/", brandsController.brandsGet);
brandRouter.get("/new", brandsController.brandFormGet);
brandRouter.post("/new", brandsController.brandFormPost);
brandRouter.get("/edit/:id", brandsController.brandEdit);
brandRouter.get("/view/:id", brandsController.brandGet);

module.exports = brandRouter;
