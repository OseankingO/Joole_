import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    productList: null,
    selectedProduct: null,
    redirectURL: null,
    detials: null,
    productLineName: null,
    categoryName: null,
    selectedCompareIdList: null,
    selectedCompareProjuctList: null
    
};

const getSuccess = (state, action) => {
    return updateObject(state, {
        selectedCompareIdList: null,
        productList: action.productList
    });
};

const selectProduct = (state, action) => {
    return updateObject(state, {
        selectedProduct: action.selectedProduct,
        redirectURL: '/detial',
        selectedCompareIdList: null,
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

const selectCompare = (state, action) => {
    return updateObject(state, {
        selectedCompareIdList: action.selectedCompareIdList
    });
};

const productCompare = (state, action) => {
    return updateObject(state, {
        selectedCompareProjuctList: action.selectedCompareProjuctList,
        redirectURL: action.redirectURL
    });
};

const compareInit = (state, action) => {
    return updateObject(state, {
        redirectURL: null
    });
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PRODCUT_GET_SUCCESS: return getSuccess(state, action);
        case actionTypes.PRODCUT_SELECT_PRODUCT: return selectProduct(state, action);
        case actionTypes.PRODCUT_DETIAL_INIT: return productDetialInit(state, action);
        case actionTypes.PRODCUT_SELECT_COMPARE: return selectCompare(state, action);
        case actionTypes.PRODCUT_COMPARE: return productCompare(state, action);
        case actionTypes.PRODCUT_COMPARE_INIT: return compareInit(state, action);
        default: return state;
    };
};

export default reducer;