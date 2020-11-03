import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    categoryId: null,
    categoryName: null,
    categoryList: null,
    productLineList: null,
    searchEmpty: false,
    searchResults: null,
    redirectPath: null,
    needUpdate: false,
    inputValue: null
};

const initSuccess = (state, action) => {
    return updateObject(state, {
        categoryId: action.categoryId,
        categoryList: action.categoryList,
        productLineList: action.productLineList
    });
};

const updateCategory = (state, action) => {
    return updateObject(state, {
        categoryId: action.categoryId,
        productLineList: action.productLineList
    });
};

const searchEmpty = (state, action) => {
    return updateObject(state, {
        searchEmpty: true
    });
};

const alertedEmpty = (state, action) => {
    return updateObject(state, {
        searchEmpty: false
    });
};

const searchSuccess = (state, action) => {
    return updateObject(state, {
        searchResults: action.searchResults,
        redirectPath: '/main',
        needUpdate: action.needUpdate,
        inputValue: action.inputValue
    });
};

const resetPath = (state, action) => {
    return updateObject(state, {
        redirectPath: null
    });
};

const setCategoryName = (state, action) => {
    return updateObject(state, {
        categoryName: action.categoryName
    });
};

const resultUpdated = (state, action) => {
    return updateObject(state, {
        needUpdate: false
    });
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CATEGORY_INIT_SUCCESS: return initSuccess(state, action);
        case actionTypes.CATEGORY_CHANGE_ID: return updateCategory(state, action);
        case actionTypes.CATEGORY_SEARCH_EMPTY: return searchEmpty(state, action);
        case actionTypes.CATEGORY_ALERTED_EMPTY: return alertedEmpty(state, action);
        case actionTypes.CATEGORY_SEARCH_SUCCESS: return searchSuccess(state, action);
        case actionTypes.CATEGORY_RESET_PATH: return resetPath(state, action);
        case actionTypes.CATEGORY_GET_CATEGORYNAME: return setCategoryName(state, action);
        case actionTypes.CATEGORY_RESULT_UPDATED: return resultUpdated(state, action);
        default: return state;
    };
};

export default reducer;