import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    productList: null,
    selectedProduct: null,
    redirectURL: null,
    detials: null,
    productLineName: null,
    categoryName: null
};

const getSuccess = (state, action) => {
    return updateObject(state, {
        productList: action.productList
    });
};

const selectProduct = (state, action) => {
    return updateObject(state, {
        selectedProduct: action.selectedProduct,
        redirectURL: '/detial',
        productLineName: action.productLineName,
        categoryName: action.categoryName
    });
};

const productDetialInit = (state, action) => {
    return updateObject(state, {
        detials: action.detials,
        redirectURL: null
    });
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PRODCUT_GET_SUCCESS: return getSuccess(state, action);
        case actionTypes.PRODCUT_SELECT_PRODUCT: return selectProduct(state, action);
        case actionTypes.PRODCUT_DETIAL_INIT: return productDetialInit(state, action);
        default: return state;
    };
};

export default reducer;