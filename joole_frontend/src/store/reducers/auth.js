import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    loading: null,
    error: null,
    token: null,
    signedUp: null,
    authRedirectPath: '/search'
};

const authStart = ( state, action ) => {
    return updateObject( state, { 
        error: null, 
        signedUp: false,
        loading: true 
    } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        error: null,
        signedUp: false,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, { 
        error: action.error,
        signedUp: false,
        loading: false
     } );
};

const signUpSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        signedUp: true
     } );
};

const authLogout = (state, action) => {
    return updateObject(state, { 
        token: null, 
        userId: null 
    });
};

const emptyMessage = (state, action) => {
    return updateObject(state, { 
        error: null,
        signedUp: false
    });
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_Fail: return authFail(state, action);
        case actionTypes.AUTH_SIGNUP_SUCCESS: return signUpSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_EMPTY_MESSAGE: return emptyMessage(state, action);
        default:
            return state;
    }
}

export default reducer;