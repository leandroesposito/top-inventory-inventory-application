const { Router } = require("express");
const categoryController = require("../controllers/categories");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.categoriesGet);
categoryRouter.get("/new", categoryController.categoryFormGet);
categoryRouter.post("/new", categoryController.categoryPost);
categoryRouter.get("/edit/:id", categoryController.categoryEdit);
categoryRouter.get("/:id", categoryController.categoryGet);

module.exports = categoryRouter;
