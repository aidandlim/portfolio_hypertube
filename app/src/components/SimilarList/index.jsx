import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import SimilarMovie from '../SimilarMovie';

import { getSimilarMovies } from '../../data';

import './index.css';

const Component = ({ id, setIsOpenDetail }) => {
    const [similarList, setSimilarList] = useState([]);
    const [isDoneSearch, setIsDoneSearch] = useState(false);

    const ui = useSelector(state => state.ui);

    useEffect(() => {
        let isCancelled = false;

        getSimilarMovies(id, ui.lang, res => {
            if (!isCancelled) {
                setSimilarList(res);
                setIsDoneSearch(true);
            }
        });
        return () => {
            isCancelled = true;
        };
    }, [id, ui.lang, setIsDoneSearch]);

    return (
        <div className="similarList">
            {similarList.length !== 0
                ? similarList.map((movie, index) => (
                      <SimilarMovie movie={movie} setIsOpenDetail={setIsOpenDetail} key={index} />
                  ))
                : null}
            {similarList.length === 0 && isDoneSearch
                ? 'We cannot find out any similar movies :('
                : null}
            {similarList.length === 0 && !isDoneSearch
                ? 'We are looking for similar movies!'
                : null}
        </div>
    );
};

export default Component;
