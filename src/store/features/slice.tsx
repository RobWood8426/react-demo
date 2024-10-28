import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
    id: string;
    name: string;
    releaseDate: string;
    openingCrawl: string;
    director: string;
    producer: string;
}

interface MoviesState {
    movies: Movie[];
    sortColumn: keyof Movie;
    sortDirection: 'asc' | 'desc';
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    sortColumn: 'name',
    sortDirection: 'asc',
    status: 'idle',
    error: null,
};

export const fetchMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
    'starwars/fetchMovies',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://swapi.dev/api/films/');

            const trimmedUsers: Movie[] = response.data.results.map((rawMovie: any) => ({
                id: rawMovie.episode_id,
                name: rawMovie.title,
                releaseDate: rawMovie.release_date,
                openingCrawl: rawMovie.opening_crawl,
                director: rawMovie.director,
                producer: rawMovie.producer,
            }));

            return trimmedUsers
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        sortData(state, action: PayloadAction<{ column: keyof Movie }>) {
            const { column } = action.payload;
            if (state.sortColumn === column) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortColumn = column;
                state.sortDirection = 'asc';
            }

            state.movies.sort((a, b) => {
                if (state.sortDirection === 'asc') {
                    return a[column] > b[column] ? 1 : -1;
                } else {
                    return a[column] < b[column] ? 1 : -1;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { sortData } = tableSlice.actions;
export default tableSlice.reducer;