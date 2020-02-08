import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { getMovie } from "../../data";

import MoreDetail from "../MoreDetail";

import StarIcon from "react-star-rating-component";
import FeatherIcon from "feather-icons-react";
import "./index.css";

const Component = ({ match, history }) => {
    const id = match.params.id;

    const [movie, setMovie] = useState({
        genres: [],
        vote_average: 0,
        production_companies: []
    });
    const [isOpenDetail, setIsOpenDetail] = useState(false);

    const ui = useSelector(state => state.ui);

    const starColor = "#FFEA00";
    const emptyStarColor = "#505050";

    useEffect(() => {
        let isCancelled = false;

        getMovie(id, ui.lang, res => {
            if (!isCancelled) {
                setMovie(res);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [id, ui.lang]);

    const _handleBack = () => {
        history.goBack();
    };

    return (
        <div className='detail'>
            {movie === null ? (
                <div className='detail-error'>Something went wrong :(</div>
            ) : (
                <div
                    className='detail-container'
                    style={{
                        backgroundImage:
                            movie.poster_path !== "" &&
                            movie.poster_path !== null &&
                            movie.poster_path !== undefined
                                ? `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`
                                : ""
                    }}
                >
                    <div className='detail-cover'>
                        <div className='detail-back' onClick={_handleBack}>
                            <FeatherIcon
                                icon='arrow-left'
                                color='#AAAAAA'
                                size='3rem'
                            />
                        </div>
                        <div
                            className='detail-open'
                            onClick={() =>
                                setIsOpenDetail(isOpenDetail => !isOpenDetail)
                            }
                        >
                            {isOpenDetail ? "HIDE DETAILS" : "SHOW DETAILS"}
                        </div>
                        <div className='detail-info-container'>
                            <div className='detail-status'>{movie.status}</div>
                            <div className='detail-genres'>
                                {movie.genres.map((genre, index) => (
                                    <div
                                        className='detail-info-general-italic'
                                        key={index}
                                    >
                                        #{genre.name.replace(" ", "_")}
                                    </div>
                                ))}
                            </div>
                            <div className='detail-title'>{movie.title}</div>
                            <div className='detail-rating-icon'>
                                <StarIcon
                                    name='rating'
                                    value={movie.vote_average / 2.0}
                                    starColor={starColor}
                                    emptyStarColor={emptyStarColor}
                                    editing={false}
                                />
                            </div>
                            <div className='detail-info-general'>
                                {movie.vote_average.toFixed(1)}&nbsp;&nbsp;(
                                {movie.vote_count})
                            </div>
                            <div className='detail-info-division'>l</div>
                            <div className='detail-info-general'>
                                {movie.runtime}{" "}
                                {ui.lang === "en_US" ? "minutes" : "분"}
                            </div>
                            <div className='detail-info-division'>l</div>
                            <div className='detail-info-general'>
                                {movie.release_date}
                            </div>
                            <div className='detail-overview'>
                                {movie.overview}
                            </div>
                            <div className='detail-companies'>
                                {movie.production_companies.map(
                                    (company, index) => (
                                        <div
                                            className='detail-info-general-small'
                                            key={index}
                                        >
                                            {company.name}
                                        </div>
                                    )
                                )}
                            </div>
                            {isOpenDetail ? (
                                <MoreDetail
                                    id={id}
                                    setIsOpenDetail={setIsOpenDetail}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Component;
