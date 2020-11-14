import Axios from "axios";
import * as actionTypes from '../actionTypes';

export const logIn = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const user = {
            username: username,
            password: password
        };
        let url = '/login';
        Axios.post(url, user)
            .then(response =>{
                if(!response.data.jwt) {
                    console.log(response.data);
                    dispatch(authFail(response.data));  
                } else {
                    localStorage.setItem('token', response.data.jwt);
                    localStorage.setItem('expirationDate', (Date.parse(response.data.expiresIn) - new Date()) / 1000);
                    localStorage.setItem('userId', response.data.id);
                    dispatch(authSuccess('token', response.data.jwt));    
                    dispatch(checkAuthTimeout((Date.parse(response.data.expiresIn) - new Date()) / 1000));
                }
                
            }).catch(error => {
                dispatch(authFail(error.data));
            });
        
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_Fail,
        error: error
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

export const signUp = (username, password, email) => {
    return dispatch => {
        const user = {
            username: username,
            password: password,
            email: email
        };
        let url = '/signup';
        Axios.post(url, user)
            .then(response =>{
                dispatch(signUpSuccess());
            }).catch(error => {
                dispatch(authFail(error.data));
            });
    };
};

export const signUpSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS
    };
};

export const emptyMessage = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.AUTH_EMPTY_MESSAGE
        });
    };
};
