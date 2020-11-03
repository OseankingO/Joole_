import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    loading: null,
    error: null,
    token: null,
    authRedirectPath: '/search'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;