import axios from 'axios';
//let base = 'http://119.23.52.238/debt';
let base = 'http://localhost:8080/';

export const requestLogin = params => { 
    return axios({
        method: 'post',
        baseURL: base,
        url: 'login',
        params: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

    }).then(res => res.data);

};

export const getUserList = params => {
    return axios({
        method: 'get',
        baseURL: base,
        url: '/user/list',
        params: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

    }).then(res => res.data);
    return axios.get(`${base}/user/list`, { params: params });
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, { params: params });
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, { params: params });
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, { params: params });
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, { params: params });
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, { params: params });
};
