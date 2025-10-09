const { Router } = require("express");
const categoryController = require("../controllers/categories");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.categoriesGet);
categoryRouter.get("/new", categoryController.categoryFormGet);
categoryRouter.post("/new", categoryController.categoryFormPost);
categoryRouter.get("/edit/:id", categoryController.categoryEdit);
categoryRouter.get("/view/:id", categoryController.categoryGet);
categoryRouter.get("/delete/:id", categoryController.categoryDeleteGet);
categoryRouter.post("/delete/:id", categoryController.categoryDeletePost);

module.exports = categoryRouter;
