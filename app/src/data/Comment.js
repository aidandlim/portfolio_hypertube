import Axios from 'axios';

export const getCommentByMovieId = (movieId, cb) => {
    const url = `/api/comment/movieId`;
    const data = {
        movieId
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });

    // cb([
    //     {
    //         userName: 'aidan',
    //         fullName: 'Aidan Lim',
    //         picture: null,
    //         comment:
    //             "If you're visiting this page, you're likely here because you're searching for a random sentence. Sometimes a random word just isn't enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways. For those writers who have writers' block, this can be an excellent way to take a step to crumbling those walls. By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project they're working on in a different light and perspective. Sometimes all it takes is to get that first sentence down to help break the block.",
    //         time: '01-06-2020 03:30'
    //     },
    //     {
    //         userName: 'lukekim',
    //         fullName: 'Luke Kim',
    //         picture: null,
    //         comment:
    //             'For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.',
    //         time: '01-06-2020 05:32'
    //     }
    // ]);
};

export const getCommentByUserId = (token, userId, cb) => {
    const url = `/api/comment/userId`;
    const data = {
        token,
        userId
    };

    Axios.get(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });

    // cb([
    //     {
    //         userName: 'aidan',
    //         fullName: 'Aidan Lim',
    //         picture: null,
    //         comment:
    //             "If you're visiting this page, you're likely here because you're searching for a random sentence. Sometimes a random word just isn't enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways. For those writers who have writers' block, this can be an excellent way to take a step to crumbling those walls. By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project they're working on in a different light and perspective. Sometimes all it takes is to get that first sentence down to help break the block.",
    //         time: '01-06-2020 03:30'
    //     },
    //     {
    //         userName: 'lukekim',
    //         fullName: 'Luke Kim',
    //         picture: null,
    //         comment:
    //             'For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.',
    //         time: '01-06-2020 05:32'
    //     }
    // ]);
};

export const postComment = (token, movieId, content, cb) => {
    const url = `/api/comment`;
    const data = {
        token,
        movieId,
        content
    };

    Axios.post(url, data)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });

    // cb(1);
};

export const deleteComment = (token, commentId, cb) => {
    const url = `/api/comment`;
    const data = {
        token,
        commentId
    };

    Axios.delete(url, { params: data })
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(null);
        });

    // cb(1);
};
