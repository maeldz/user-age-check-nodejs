const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("./views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");
app.use(express.urlencoded({ extended: false }));

const ageMiddleware = (req, res, next) =>
  !req.query.age ? res.redirect("/") : next();

app.get("/", (req, res) => res.render("age"));

app.post("/check", (req, res) =>
  req.body.age < 18
    ? res.redirect(`/minor?age=${req.body.age}`)
    : res.redirect(`/major?age=${req.body.age}`)
);

app.get("/major", ageMiddleware, (req, res) =>
  res.render("major", { age: req.query.age })
);

app.get("/minor", ageMiddleware, (req, res) =>
  res.render("minor", { age: req.query.age })
);

app.listen(3000);
