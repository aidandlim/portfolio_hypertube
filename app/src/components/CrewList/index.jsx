import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Crew from '../Crew';

import { getMovieDetail } from '../../data';

import './index.css';

const Component = ({ id }) => {
    const [crewList, setCrewList] = useState([]);
    const [isDoneSearch, setIsDoneSearch] = useState(false);

    const ui = useSelector(state => state.ui);

    useEffect(() => {
        let isCancelled = false;

        getMovieDetail(id, ui.lang, res => {
            if (!isCancelled) {
                setCrewList(res.crew);
                setIsDoneSearch(true);
            }
        });
        return () => {
            isCancelled = true;
        };
    }, [id, ui.lang, setIsDoneSearch]);

    return (
        <div className="crewList">
            {crewList.length !== 0
                ? crewList.map((crew, index) => (
                      <Crew crew={crew} key={index} />
                  ))
                : null}
            {crewList.length === 0 && isDoneSearch
                ? 'We cannot find out any producer information :('
                : null}
            {crewList.length === 0 && !isDoneSearch
                ? 'We are looking for producer information!'
                : null}
        </div>
    );
};

export default Component;
