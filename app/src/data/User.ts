import Axios from 'axios';

export const signin = (userName: string, password: string, cb: (result: number) => void) => {
    let url = `/api/auth?userName=${userName}&password=${password}`;

    Axios.get(url)
        .then((res: { data: number}) => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};
