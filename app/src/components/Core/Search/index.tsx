import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_results } from '../../../actions';

import { getSearch } from '../../../data';

import Movie from '../Feed/Movie';

import './index.css';

export interface Props {}

export interface State {
    search: {
        query: string;
        results: [];
        page: number;
        total: number;
    };
}

const Component: React.FC<Props> = () => {
    const search = useSelector((state: State) => state.search);
    const dispatch = useDispatch();

    let isWorking = false;

    const _handleScroll = e => {
        if (search.page < search.total) {
            if (
                !isWorking &&
                e.target.scrollTop /
                    (e.target.scrollHeight - e.target.clientHeight) >
                    0.9
            ) {
                isWorking = true;
                getSearch(
                    search.query,
                    search.page + 1,
                    (res: { results: []; page: number; total: number }) => {
                        dispatch(
                            search_results({
                                results: [...search.results, ...res.results],
                                page: res.page,
                                total: res.total
                            })
                        );
                        isWorking = false;
                    }
                );
            }
        }
    };

    return (
        <div className="search" onScroll={_handleScroll}>
            {search.results.map(
                (
                    movie: {
                        id: number;
                        title: string;
                        genre_ids: string[];
                        vote_average: number;
                        release_date: string;
                        poster_path: string;
                        overview: string;
                    },
                    index: number
                ) => (
                    <Movie movie={movie} key={index} />
                )
            )}
        </div>
    );
};

export default Component;
