import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchMovies } from '../store/features/slice';

const useAppDispatch: () => AppDispatch = useDispatch;

const MovieDetail: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    const goToHome = () => {
        navigate('/');
    };

    type MovieParam = {
        movieId: string;
    };

    const { movieId } = useParams<MovieParam>();
    const { movies, status, error } = useSelector((state: RootState) => state.movie);
    const currentMovie = movies.find((movie) => String(movie.id) === movieId);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    if (status === 'succeeded' && !currentMovie) return <p>Movie failed to Load, please check movie ID <button onClick={goToHome}>Home</button></p>;

    return (
        <div>
            <h1>{currentMovie?.name}</h1>
            <div>Directed By: {currentMovie?.director}</div>
            <div>Produced By: {currentMovie?.producer}</div>
            <div>Released On: {currentMovie?.releaseDate}</div>
            <div>Opening Crawl: {currentMovie?.openingCrawl}</div>
            <button onClick={goToHome}>Home</button>
        </div>
    );
};

export default MovieDetail;