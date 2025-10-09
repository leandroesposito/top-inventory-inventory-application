const { param, validationResult } = require("express-validator");
const brandsDB = require("../db/brands");
const carsDB = require("../db/cars");
const {
  createTextChain,
  createIntChain,
  idParamIsInt,
  checkPassword,
} = require("./validators");

const validateBrand = [
  createTextChain("name", 100),
  createTextChain("country", 40),
  createIntChain("founded-year"),
  createTextChain("description"),
];

const brandExist = () =>
  param("id").custom(async (value, { req }) => {
    if (!Number.isInteger(value)) {
      return;
    }

    const brand = await brandsDB.getBrandById(value);
    if (!brand) {
      throw new Error(`Brand with id ${value} doesn't exist`);
    }
    req.locals = { brand };
  });

async function brandsGet(req, res) {
  const brands = await brandsDB.getAllBrands();

  res.status(200).render("brands.ejs", {
    title: "Brands",
    brands,
    errors: res.locals.errors,
  });
}

const brandGet = [
  idParamIsInt(),
  brandExist(),
  async function brandGet(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return brandsGet(req, res);
    }

    const brand = req.locals.brand;
    const cars = await carsDB.getCarsByBrandId(brand.id);

    res.status(200).render("brand.ejs", { title: brand.name, brand, cars });
  },
];

async function brandFormGet(req, res) {
  const title = res.locals.brand ? "Edit brand" : "New brand";

  res.status(200).render("brands_form.ejs", {
    title: title,
    errors: res.locals.errors,
    brand: res.locals.brand,
  });
}

const brandFormPost = [
  checkPassword(),
  validateBrand,
  async function brandFormPost(req, res) {
    const brand = {
      id: req.body.id,
      name: req.body.name,
      country: req.body.country,
      founded_year: req.body["founded-year"],
      description: req.body.description,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.brand = brand;
      res.locals.errors = errors.array();

      return brandFormGet(req, res);
    }

    if (brand.id) {
      await brandsDB.updateBrand(brand.id, brand);
    } else {
      brand.id = await brandsDB.createBrand(brand);
    }

    res.redirect(`/brands/view/${brand.id}`);
  },
];

const brandEdit = [
  idParamIsInt(),
  brandExist(),
  async function brandEdit(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
    } else {
      res.locals.brand = req.locals.brand;
    }

    brandFormGet(req, res);
  },
];

const brandDeleteGet = [
  idParamIsInt(),
  brandExist(),
  async function brandDeleteGet(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return brandsGet(req, res);
    }

    const brand = req.locals.brand;
    res.status(200).render("delete.ejs", {
      title: "Delete brand",
      type: "brand",
      name: brand.name,
      action: `/brands/delete/${brand.id}`,
    });
  },
];

const brandDeletePost = [
  idParamIsInt(),
  checkPassword(),
  brandExist(),
  async function brandDeletePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      return brandsGet(req, res);
    }

    const brand = req.locals.brand;
    await brandsDB.deleteBrand(brand.id);
    res.redirect("/brands");
  },
];

module.exports = {
  brandsGet,
  brandGet,
  brandFormGet,
  brandFormPost,
  brandEdit,
  brandDeleteGet,
  brandDeletePost,
};
