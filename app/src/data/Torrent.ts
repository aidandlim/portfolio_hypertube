import Axios from 'axios';

export const getTorrents = (id: number, cb: (result: []) => void) => {
    let url = `/search/${id}`;

    Axios.get(url)
        .then((res: any) => {
            console.log(res);
            if (res.data[0] === undefined) {
                cb([]);
            } else {
                cb(res.data);
            }
        })
        .catch(() => {
            cb([]);
        });
};
