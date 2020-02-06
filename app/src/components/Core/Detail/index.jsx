import React, { useState, useEffect } from 'react';

import { getMovie, getTorrents } from '../../../data';

import StarRatingComponent from 'react-star-rating-component';

import FeatherIcon from 'feather-icons-react';

import './index.css';

const Component = ({ match, history }) => {
    const id = match.params.id;
    const [movie, setMovie] = useState({});
    const [torrentList, setTorrentList] = useState([]);
    const [isOpenTorrentList, setIsOpenTorrentList] = useState(false);
    const [isDoneSearch, setIsDoneSearch] = useState(false);

    const starColor = '#FFEA00';
    const emptyStarColor = '#505050';

    useEffect(() => {
        getMovie(id, res => {
            setMovie(res);
        });
        getTorrents(id, res => {
            setTorrentList(res);
            setIsDoneSearch(true);
        });
    }, [id]);

    const _handleBack = () => {
        history.goBack();
    };

    const _handleTorrentList = () => {
        setIsOpenTorrentList(isOpenTorrentList => !isOpenTorrentList);
    };

    return (
        <div className="detail">
            {movie === null ? (
                <div className="detail-error">Something went wrong :(</div>
            ) : (
                <div
                    className="detail-container"
                    style={{
                        backgroundImage:
                            movie.poster_path !== '' &&
                            movie.poster_path !== null
                                ? `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`
                                : ''
                    }}
                >
                    <div className="detail-cover">
                        <div className="detail-back" onClick={_handleBack}>
                            <FeatherIcon
                                name="arrow-left"
                                color="#AAAAAA"
                                size="3rem"
                            />
                        </div>
                        <div
                            className="detail-play"
                            onClick={_handleTorrentList}
                        >
                            {isOpenTorrentList
                                ? '(HIDE)'
                                : 'WATCHING RIGHT NOW!'}
                        </div>
                        <div className="detail-info-container">
                            <div className="detail-status">{movie.status}</div>
                            <div className="detail-genres">
                                {movie.genres.map((genre, index) => (
                                    <div
                                        className="detail-info-general-italic"
                                        key={index}
                                    >
                                        #{genre.name.replace(' ', '_')}
                                    </div>
                                ))}
                            </div>
                            <div className="detail-title">{movie.title}</div>
                            <div className="detail-rating-icon">
                                <StarRatingComponent
                                    name="rating"
                                    value={movie.vote_average / 2.0}
                                    starColor={starColor}
                                    emptyStarColor={emptyStarColor}
                                    editing={false}
                                />
                            </div>
                            <div className="detail-info-general">
                                {movie.vote_average.toFixed(1)}&nbsp;&nbsp;(
                                {movie.vote_count})
                            </div>
                            <div className="detail-info-division">l</div>
                            <div className="detail-info-general">
                                {movie.runtime} minutes
                            </div>
                            <div className="detail-info-division">l</div>
                            <div className="detail-info-general">
                                {movie.release_date}
                            </div>
                            <div className="detail-overview">
                                {movie.overview}
                            </div>
                            <div className="detail-companies">
                                {movie.production_companies.map(
                                    (company, index) => (
                                        <div
                                            className="detail-info-general-small"
                                            key={index}
                                        >
                                            {company.name}
                                        </div>
                                    )
                                )}
                            </div>
                            {isOpenTorrentList ? (
                                <div className="detail-torrent">
                                    {torrentList.length !== 0
                                        ? torrentList.map((torrent, index) => (
                                              <div
                                                  className="detail-torrent-file"
                                                  key={index}
                                                  onClick={() =>
                                                      window.open(
                                                          torrent.download
                                                      )
                                                  }
                                              >
                                                  <div className="detail-torrent-file-title">
                                                      {torrent.title}
                                                  </div>
                                                  <div className="detail-torrent-file-info">
                                                      {(
                                                          torrent.size /
                                                          1024 /
                                                          1024 /
                                                          1024
                                                      ).toFixed(2)}
                                                      GB
                                                  </div>
                                                  <div className="detail-torrent-file-division">
                                                      l
                                                  </div>
                                                  <div className="detail-torrent-file-info">
                                                      {torrent.seeders}
                                                  </div>
                                                  <div className="detail-torrent-file-division">
                                                      l
                                                  </div>
                                                  <div className="detail-torrent-file-info">
                                                      {torrent.leechers}
                                                  </div>
                                              </div>
                                          ))
                                        : isDoneSearch
                                        ? 'We cannot find out any torrent file :('
                                        : 'We are looking for torrent file!'}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Component;
