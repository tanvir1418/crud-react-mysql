import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, [movieList]);

  const submitReview = () => {
    axios
      .post("http://localhost:3002/api/insert", {
        movieName: movieName,
        movieReview: review,
      })
      .then(() => {
        setMovieList([
          ...movieList,
          {
            movieName: movieName,
            movieReview: review,
          },
        ]);
      });
  };

  const deleteReview = (movieId) => {
    axios.delete(`http://localhost:3002/api/delete/${movieId}`);
  };

  const updateReview = (movieName) => {
    axios.put("http://localhost:3002/api/update", {
      movieName: movieName,
      movieReview: newReview,
    });
    console.log(newReview);
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          placeholder="Enter Movie Name"
          onChange={(e) => setMovieName(e.target.value)}
        />

        <label>Review:</label>
        <input
          type="text"
          name="review"
          placeholder="Enter Movie Review"
          onChange={(e) => setReview(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>

        <ul>
          {movieList.map((movie) => (
            <li key={movie.id}>
              <h1>{movie.movieName}</h1>
              <p>{movie.movieReview}</p>
              <div className="actions">
                <button onClick={() => deleteReview(movie.id)}>Delete</button>
                <div className="update__wrap">
                  <input
                    type="text"
                    className="update__input"
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                  <button onClick={() => updateReview(movie.movieName)}>
                    Update
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
