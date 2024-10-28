import React from 'react';
import SortableTable from '../components/SortableMovieTable';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Star Wars Table</h1>
            <SortableTable/>
        </div>
    );
};

export default Home;