import Axios from "axios";
import * as actionTypes from '../actionTypes';

export const logIn = (username, password) => {
    return dispatch => {
        console.log("started!")
        dispatch(authStart());
        const user = {
            username: username,
            password: password
        };
        let url = '/login';
        setTimeout(() => {
            localStorage.setItem('token', 'token');
            localStorage.setItem('expirationDate', 7*24*60*60);
            localStorage.setItem('userId', '1');
            dispatch(authSuccess('token', '1'));    
            dispatch(checkAuthTimeout(7*24*60*60));
        }, 2 * 1000);
        // Axios.post(url, user)
        //     .then(response =>{
        //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //         console.log(response);
        //     }).catch(error => {
        //         console.log("?????????????????????????????????");
        //         console.log(error);
        //     });
        
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const signUp = (username, password, email) => {};