import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { sortData, fetchMovies } from '../store/features/slice';
import { Link } from 'react-router-dom';

const useAppDispatch: () => AppDispatch = useDispatch;

const SortableTable: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const { movies, status, error, sortColumn, sortDirection } = useSelector((state: RootState) => state.movie);

    const handleSort = (column: keyof typeof movies[number]) => {
        dispatch(sortData({ column }));
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>
                        Name {sortColumn === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th onClick={() => handleSort('releaseDate')}>
                        Release Date {sortColumn === 'releaseDate' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                    </th>
                </tr>
            </thead>
            <tbody>
                {movies.map((item) => (
                    <tr key={item.id}>
                        <td><Link to={`/movie/${item.id}`}>{item.name}</Link></td>
                        <td>{item.releaseDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SortableTable;