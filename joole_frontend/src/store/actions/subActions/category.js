import Axios from 'axios';
import * as actionTypes from '../actionTypes';

export const onInitSearchData = () => {
    return dispatch => {
        // get categories
        let categories = [{id: 1, name: 'Mechanical'}, {id: 2, name: 'Food'}];
        const urlCat = '/category'
        // Axios.get(urlCat).then();

        // for first category, get all product lines
        let productLines = [{id: 1, name: 'HVAC Fans', categoryId: 1}, {id: 2, name: 'New Fans', categoryId: 1}];
        const defaultCatId = categories[0].id;
        const urlPro = '/productLine/' + defaultCatId.toString;
        // Axios.get(urlPro).then();
        dispatch(initSuccess(defaultCatId, categories, productLines));
    };
};

export const initSuccess = (categoryId, categories, productLines) => {
    return {
        type: actionTypes.CATEGORY_INIT_SUCCESS,
        categoryId: categoryId,
        categoryList: categories,
        productLineList: productLines
    };
};

export const changeCategory = (categoryId) => {
    return dispatch => {
        let productLines = null;
        const urlPro = '/productLine/' + categoryId.toString;
        // Axios.get(urlPro).then();
        switch(categoryId) {
            case '1': 
                productLines = [{id: 1, name: 'HVAC Fans', categoryId: 1}, {id: 2, name: 'New Fans', categoryId: 1}];
                break;
            case '2':
                productLines = [{id: 3, name: 'Apple', categoryId: 2}, {id: 4, name: 'Avocado', categoryId: 2}];
                break;
            default:
                productLines = [{id: 1, name: 'HVAC Fans', categoryId: 1}, {id: 2, name: 'New Fans', categoryId: 1}];
                break;
        }
        dispatch(categoryUpdate(categoryId, productLines));

    };
};

export const categoryUpdate = (categoryId, productLines) => {
    return {
        type: actionTypes.CATEGORY_CHANGE_ID,
        categoryId: categoryId,
        productLineList: productLines
    };
};

export const search = (inputProductLine, categoryId) => {
    return dispatch => {
        let productLines = null;
        let productLineIdList = [];
        const urlPro = '/productLine/' + categoryId.toString + '/' + inputProductLine;
        // Axios.get(urlPro).then();
        switch(categoryId) {
            case '1': 
                productLines = [{id: 1, name: 'HVAC Fans', categoryId: 1}, {id: 2, name: 'New Fans', categoryId: 1}];
                break;
            case '2':
                productLines = [{id: 3, name: 'Apple', categoryId: 2}, {id: 4, name: 'Avocado', categoryId: 2}];
                break;
            default:
                productLines = [{id: 1, name: 'HVAC Fans', categoryId: 1}, {id: 2, name: 'New Fans', categoryId: 1}];
                break;
        }
        for(let key in productLines) {
            if(productLines[key].name.toUpperCase().includes(inputProductLine.toUpperCase())) {
                productLineIdList.push(productLines[key]);
            }
        }
        if(productLineIdList.length === 0 || !productLineIdList) {
            dispatch(searchEmpty());
        } else {
            dispatch(searchSuccess(productLineIdList, inputProductLine));
        }
    };
};

export const searchEmpty = () => {
    return {
        type: actionTypes.CATEGORY_SEARCH_EMPTY
    };
};

export const alertedEmpty = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CATEGORY_ALERTED_EMPTY
        });
    };
};

export const searchSuccess = (productLineIdList, inputProductLine) => {
    return {
        type: actionTypes.CATEGORY_SEARCH_SUCCESS,
        searchResults: productLineIdList,
        inputValue: inputProductLine,
        needUpdate: true
    };
};

export const resetRedirectPath = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CATEGORY_RESET_PATH
        });
    };
};

export const getCategoryName = (categoryId) => {
    return dispatch => {
        let categoryName = null;
        const urlCat = '/category/' + categoryId.toString;
        // Axios.get(urlCat).then();
        
        switch(categoryId) {
            case '1': 
                categoryName = 'Mechanical';
                break;
            case '2': 
                categoryName = 'Food';
                break;
            default:
                categoryName = 'Mechanical';
        }
        dispatch({
            type: actionTypes.CATEGORY_GET_CATEGORYNAME,
            categoryName: categoryName
        });
    };
};

export const searchUpdated = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CATEGORY_RESULT_UPDATED
        });
    };
};
