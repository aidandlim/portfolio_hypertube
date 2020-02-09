import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Comment from '../Comment';
import CommentPost from '../CommentPost';

import { getMovieComment } from '../../data';

import './index.css';

const Component = ({ id }) => {
    const [commentList, setCommentList] = useState([]);
    const [isDoneSearch, setIsDoneSearch] = useState(false);

    const ui = useSelector(state => state.ui);

    useEffect(() => {
        let isCancelled = false;

        getMovieComment(id, res => {
            setTimeout(() => {
                if (!isCancelled) {
                    setCommentList(res);
                    setIsDoneSearch(true);
                }
            }, 1000);
        });
        return () => {
            isCancelled = true;
        };
    }, [id, setIsDoneSearch]);

    return (
        <div className='commentList'>
            <div className='commentList-container'>
                {commentList.length !== 0
                    ? commentList.map((comment, index) => (
                          <Comment comment={comment} key={index} />
                      ))
                    : null}
                {commentList.length === 0 && isDoneSearch
                    ? ui.lang === 'en_US'
                        ? 'We cannot find out any comments :('
                        : '등록된 코멘트가 없습니다 :('
                    : null}
                {commentList.length === 0 && !isDoneSearch
                    ? ui.lang === 'en_US'
                        ? 'We are looking for comments!'
                        : '코멘트를 검색 중입니다!'
                    : null}
            </div>
            <CommentPost />
        </div>
    );
};

export default Component;
