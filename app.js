require("dotenv").config();
const path = require("node:path");
const express = require("express");
const carRouter = require("./routes/car");
const categoryRouter = require("./routes/category");
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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("App running on port", PORT);
});
