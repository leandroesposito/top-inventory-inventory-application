require("dotenv").config();
const path = require("node:path");
const express = require("express");
const carRouter = require("./routes/car");
const app = express();

const PORT = process.env.PORT || 3000;

const viewsFolder = "views";

app.set("views", path.join(__dirname, viewsFolder));
app.set("views engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/cars", carRouter);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("App running on port", PORT);
});
