const hbs = require("hbs");
const path = require("path");
const axios = require("axios");
const morgan = require("morgan");
const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/searchResults", (req, res) => {
  const { movieName } = req.query;

  axios
    .get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_Key}&s=${movieName}&page=10`
    )
    .then((OMDBResponse) => {
      const { Search, totalResults } = OMDBResponse.data;

      res.render("search-results", { movieName, Search, totalResults });
    })
    .catch((error) => console.log(error));
});

app.get("/movie/:movieId", (req, res) => {
  const { movieId } = req.params;

  axios
    .get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_Key}&i=${movieId}`
    )
    .then((OMDBMovie) => {
      const movie = OMDBMovie.data;

      res.render("movie", { movie });
    })
    .catch((error) => console.log(error));
});

app.post("/searchResults", (req, res) => {
  const { movieName } = req.body;

  axios
    .get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_Key}&s=${movieName}&page=10`
    )
    .then((OMDBResponse) => {
      const { Search, totalResults } = OMDBResponse.data;

      res.render("search-results", { movieName, Search, totalResults });
    })
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
