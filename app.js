require("dotenv").config();
const path = require("node:path");
const express = require("express");
const carRouter = require("./routes/car");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");

const app = express();

const PORT = process.env.PORT || 3000;

const viewsFolder = "views";
const assestFolder = "public";

app.set("views", path.join(__dirname, viewsFolder));
app.set("views engine", "ejs");

app.use(express.static(path.join(__dirname, assestFolder)));
app.use(express.urlencoded({ extended: true }));

app.use("/cars", carRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Supercars Garage" });
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(500).render("500.ejs", {
    title: "Server Error",
  });
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("App running on port", PORT);
});
