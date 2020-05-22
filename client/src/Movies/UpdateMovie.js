import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import fetchMovies from '../apis/fetchMovies';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = ({ movieList, setMovieList }) => {
    const [updatedMovie, setUpdatedMovie] = useState(initialState);
    const params = useParams();
    const history = useHistory();

    const fetchMovie = (id) => {
        fetchMovies.get(`/api/movies/${id}`)
            .then((res) => {
                setUpdatedMovie(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            });
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id])

    const handleChanges = e => {
        if (e.target.name === 'stars') {
            const newStars = updatedMovie.stars.map((star, id) => {
                if (e.target.id === id) {
                    return e.target.value;
                }
                return star;
            })
            setUpdatedMovie({ ...updatedMovie, [e.target.name]: newStars, })
        } else {
            setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value, })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetchMovies.put(`/api/movies/${params.id}`, updatedMovie)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response)
            });

        const newMovieList = movieList.map(e => {
            if (e.id === params.id) {
                return updatedMovie;
            }
            return e;
        });

        setMovieList(newMovieList);
        history.push('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                value={updatedMovie.title}
                onChange={handleChanges}
            />
            <input
                name="director"
                value={updatedMovie.director}
                onChange={handleChanges}
            />
            <input
                name="metascore"
                value={updatedMovie.metascore}
                onChange={handleChanges}
            />
            {updatedMovie.stars.map((star, id) => {
                return (<input
                    key={id}
                    name="stars"
                    id={id}
                    value={star}
                    onChange={handleChanges}
                />)
            })}
            <button>Update</button>
        </form>
    );
}

export default UpdateMovie;