const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudreactmysql",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert/", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sql = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  connection.query(sql, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movieId", (req, res) => {
  const id = req.params.movieId;
  const sql = "DELETE FROM movie_reviews WHERE id = ?";
  connection.query(sql, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sql = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  connection.query(sql, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.get("/api/get", (req, res) => {
  const sql = "SELECT * FROM movie_reviews";
  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

app.listen(3002, () => {
  console.log("Server started at port 3002");
});
