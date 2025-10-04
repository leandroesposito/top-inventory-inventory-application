const { param, validationResult } = require("express-validator");
const categoriesDB = require("../db/categories");
const { createTextChain } = require("./validators");
const { getCarsByCategoryId } = require("../db/cars");

const validateCategory = [
  createTextChain("name", 100),
  createTextChain("description"),
];

const categoryExist = () =>
  param("id").custom(async (value, { req }) => {
    const category = await categoriesDB.getCategoryById(value);
    if (!category) {
      throw new Error(`Category with id ${value} doesn't exist`);
    }
    req.locals = { category };
  });

async function categoriesGet(req, res) {
  const categories = await categoriesDB.getAllCategories();

  res.status(200).render("categories.ejs", { title: "Categories", categories });
}

const categoryGet = [
  param("id").isInt().withMessage("Id parameter must be a number"),
  categoryExist,
  async function categoryGet(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("category.ejs", {
        title: "Category Error",
        errors: errors.array(),
      });
    }

    const category = req.locals.category;
    const cars = await getCarsByCategoryId(category.id);

    res
      .status(200)
      .render("category.ejs", { title: category.name, category, cars });
  },
];

async function categoryFormGet(req, res) {
  const title = res.locals.category ? "Edit category" : "New Category";

  res.status(200).render("category_form.ejs", {
    title: title,
    category: res.locals.category,
    errors: res.locals.errors,
  });
}

const categoryPost = [
  validateCategory,
  async function categoryPost(req, res) {
    const category = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      res.locals.category = category;
      return categoryFormGet(req, res);
    }

    if (category.id) {
      await categoriesDB.updateCategory(category.id, category);
    } else {
      category.id = await categoriesDB.createCategory(
        category.name,
        category.description
      );
    }

    res.redirct(`/category/${category.id}`);
  },
];

const categoryEdit = [
  param("id").isInt().withMessage("Id parameter must be a number"),
  categoryExist,
  async function categoryEdit(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.errors = errors.array();
      return categoriesGet(req, res);
    }

    res.locals.category = req.locals.category;
    categoriesGet(req, res);
  },
];

module.exports = {
  categoriesGet,
  categoryGet,
  categoryPost,
  categoryEdit,
  categoryFormGet,
};
