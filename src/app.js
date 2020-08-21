const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("../src/utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000; //process.env.PORT for heroku

//geting the pulic/index.html
//default app.get('/')
app.use(express.static(path.join(__dirname, "../public")));
//change view folder to template
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// app.get("/", (req, res, next) => {
//   res.send("<h1>Hello Weather</h1>");
// });
// app.get("/help", (req, res, next) => {
//   res.send({
//     name: "Van",
//     age: 100,
//   });
// });
// app.get("/about", (req, res, next) => {
//   res.send("<h1>About Page </h1>");
// });

//====view
//set up the the view engine and by using handlebar
app.set("view engine", "hbs");
app.set("views", viewPath); //update the view path to template
hbs.registerPartials(partialsPath);

//use res.render to render view
app.get("", (req, res, next) => {
  res.render("index", {
    title: "Weather App",
    name: "Van vy",
  });
});
app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About Me",
    name: "Van vy",
  });
});
app.get("/help", (req, res, next) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help Page",
    name: "Van vy",
  });
});
app.get("/weather", (req, res, next) => {
  if (!req.query.address)
    return res.send({
      Error: "You must add an address",
    });

  forecast(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      forecast: data,
      address: req.query.address,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      Error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Van",
    errorMessage: "Help article is not found",
  });
});

//404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Van",
    errorMessage: "Page is not found",
  });
});

//port

//listen
app.listen(port, () => {
  console.log("Server is running on " + port);
});
