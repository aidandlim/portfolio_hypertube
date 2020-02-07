import React from 'react';

import { useSelector } from 'react-redux';

import './index.css';

const Component = ({ genre_ids }) => {
    const movie = useSelector(state => state.movie);

    return genre_ids.map((genre_id, index) => (
        <div className="genre" key={index}>
            {movie.genres.find((genre) => genre.id === genre_id).name}
        </div>
    ));
};

export default Component;
