import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import fetchMovies from '../apis/fetchMovies';
import { Link } from "react-router-dom";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    fetchMovies.get(`/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    fetchMovies.delete(`/api/movies/${params.id}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

    setMovieList(movieList.filter(movie => {
      return movie.id !== params.id;
    }));
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>Update</Link>
      <Link to={`/`} onClick={deleteMovie}>Delete</Link>
    </div>
  );
}

export default Movie;
