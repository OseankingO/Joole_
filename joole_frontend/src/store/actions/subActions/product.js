import Axios from 'axios';
import * as actionTypes from '../actionTypes';

export const getProductList = (idList) => {
    return dispatch => {
        let brandList = [
            {id: 1, name: 'Big Ass'},
            {id: 2, name: 'Emerson'},
            {id: 3, name: 'Minka'},
            {id: 4, name: 'Westinghouse'},
            {id: 5, name: 'Sean'},
        ];
        let productList = [
            {id: 1, series: 'Haiku H', model: 'S3150-S0-BC-04-01-C-01', brandId: 1, productLineId: 1}, 
            {id: 2, series: 'Luray Eco Series', model: 'CF860', brandId: 2, productLineId: 1},
            {id: 3, series: 'Aviation Series', model: 'F853-RW', brandId: 3, productLineId: 1},
            {id: 4, series: 'Industrail Ceiling Fan', model: '78003', brandId: 4, productLineId: 1},
            {id: 5, series: 'Haiku H', model: 'S3150-S0-BC-04-01-C-01', brandId: 1, productLineId: 1},
            {id: 6, series: 'My Fan', model: '123456', brandId: 5, productLineId: 2}, 
        ];
        let propertyTypeList = [
            {id: 1, name: 'type'},
            {id: 2, name: 'technical specifications'}
        ];
        let propertyList = [
            {id: 1, name: 'Use Tpye', propertyTypeId: 1, productLineId: 1},
            {id: 2, name: 'Application', propertyTypeId: 1, productLineId: 1},
            {id: 3, name: 'Airflows(CFM)', propertyTypeId: 2, productLineId: 1},
            {id: 4, name: 'Power(W)', propertyTypeId: 2, productLineId: 1},
            {id: 5, name: 'Where', propertyTypeId: 1, productLineId: 1},
            {id: 6, name: 'When', propertyTypeId: 1, productLineId: 1},
            {id: 7, name: 'What', propertyTypeId: 2, productLineId: 1},
            {id: 8, name: 'How', propertyTypeId: 2, productLineId: 1}
        ];
        let productHasPropertyList = [
            {productId: 1, propertyId: 1, value: 'Commercial', extra_value: null},
            {productId: 1, propertyId: 2, value: 'Indoor', extra_value: null},
            {productId: 1, propertyId: 3, value: '5,467', extra_value: null},
            {productId: 1, propertyId: 4, value: '1.95', extra_value: '21.14'},
            {productId: 2, propertyId: 1, value: 'Commercial', extra_value: null},
            {productId: 2, propertyId: 2, value: 'Indoor', extra_value: null},
            {productId: 2, propertyId: 3, value: '8,500', extra_value: null},
            {productId: 2, propertyId: 4, value: '2.85', extra_value: '33.00'},
            {productId: 3, propertyId: 1, value: 'Commercial', extra_value: null},
            {productId: 3, propertyId: 2, value: 'Outdoor', extra_value: null},
            {productId: 3, propertyId: 3, value: '6,604', extra_value: null},
            {productId: 3, propertyId: 4, value: '3.69', extra_value: '25.92'},
            {productId: 4, propertyId: 1, value: 'Commercial', extra_value: null},
            {productId: 4, propertyId: 2, value: 'Outdoor', extra_value: null},
            {productId: 4, propertyId: 3, value: '5,467', extra_value: null},
            {productId: 4, propertyId: 4, value: '1.95', extra_value: '21.14'},
            {productId: 5, propertyId: 1, value: 'Commercial', extra_value: null},
            {productId: 5, propertyId: 2, value: 'Outdoor', extra_value: null},
            {productId: 5, propertyId: 3, value: '5,467', extra_value: null},
            {productId: 5, propertyId: 4, value: '1.95', extra_value: '21.14'},
            {productId: 6, propertyId: 5, value: 'UK', extra_value: null},
            {productId: 6, propertyId: 6, value: '10', extra_value: '20'},
            {productId: 6, propertyId: 7, value: 'Student', extra_value: null},
            {productId: 6, propertyId: 8, value: 'HOWWWW', extra_value: 'HOWWWWWWW'},
        ];

        //get brands
        const urlBrands = '/brand'
        // Axios.get(urlBrands).then();

        //get products acording to idList 
        for(let id of idList) {
            let urlProducts = '/product/' + id.toString;
            // Axios.get(urlProducts).then();
        }

        //get types
        const urlTypes = '/type'
        // Axios.get(urlTypes).then();

        //get properties acording to idList 
        for(let id of idList) {
            let urlProperties = '/property/' + id.toString;
            // Axios.get(urlProperties).then();
        }

        //get productHasPropertyList according to projectList
        for(let key in productList) {
            let productId = productList[key].id;
            const urlPHP = '/productHasProperty/' + productId.toString;
            // Axios.get(urlPHP).then();
        }
        
        let final = [];
        productList = productList.filter(product => {
            for(let id of idList) {
                if(id === product.productLineId) {
                    return true;
                }
            }
            return false;
        });
        for(let key in productList) {
            let tmpBrand = brandList.find(brand => brand.id === productList[key].brandId);
            let tmp = {
                id: productList[key].id, 
                series: productList[key].series, 
                model: productList[key].model,
                brand: tmpBrand.name,
                productLineId: productList[key].productLineId
            };
            let tmpProductHasPropertyList = productHasPropertyList.filter(line => {return line.productId === productList[key].id;});
            let tmpPropertyList = [];
            for(let tmpPHPKey in tmpProductHasPropertyList) {
                let tmpProperty = {
                    id: tmpProductHasPropertyList[tmpPHPKey].propertyId,
                    name: propertyList.find(p => p.id === tmpProductHasPropertyList[tmpPHPKey].propertyId).name,
                    typeId: propertyList.find(p => p.id === tmpProductHasPropertyList[tmpPHPKey].propertyId).propertyTypeId,
                    value: tmpProductHasPropertyList[tmpPHPKey].value,
                    extraValue: tmpProductHasPropertyList[tmpPHPKey].extra_value
                };
                tmpPropertyList.push(tmpProperty);
            }
            for(let tmpTypeKey in propertyTypeList) {
                let tmpTypeProList = tmpPropertyList.filter(property => {return property.typeId === propertyTypeList[tmpTypeKey].id});
                tmp[propertyTypeList[tmpTypeKey].name.replace(' ', '')] = tmpTypeProList;
            }
            final.push(tmp);
        }
        dispatch(getSuccess(final));
    };
};

export const getSuccess = (productList) => {
    return {
        type: actionTypes.PRODCUT_GET_SUCCESS,
        productList: productList
    };
};

export const selectProduct = (product, categoryName) => {
    return dispatch => {
        const productLines = [
            {id: 1, name: 'HVAC Fans', categoryId: 1}, 
            {id: 2, name: 'New Fans', categoryId: 1}, 
            {id: 3, name: 'Apple', categoryId: 2}, 
            {id: 4, name: 'Avocado', categoryId: 2}
        ];
        let productLineName = null;
        const urlPLName = '/productLine/' + product.productLineId.toString;
        // Axios.get(urlPLName).then();
        productLineName = productLines.find(productLine => {return productLine.id === product.productLineId}).name
        dispatch({
            type: actionTypes.PRODCUT_SELECT_PRODUCT,
            selectedProduct: product,
            categoryName: categoryName,
            productLineName: productLineName
        });
    };
};

export const initProductDetial = (productId) => {
    let detials = [
        {id: 1, text: 'To center an image, set left and right margin to auto and make it into a block element', projectId: productId},
        {id: 2, text: 'Thank you for downloading Chrome!', projectId: productId},
        {id: 3, text: 'You can adjust your privacy controls', projectId: productId},
        {id: 4, text: 'Center aligning has no effect if the', projectId: productId},
        {id: 5, text: 'Tip: For more examples on how to align text, see the CSS Text chapter.', projectId: productId},
        {id: 6, text: 'This text is centered.', projectId: productId},
        {id: 7, text: 'Center an Image', projectId: productId}
    ];
    const urlProdct = '/detial/' + productId.toString;
    // Axios.get(urlProdct).then();
    return dispatch => {
        dispatch({
            type: actionTypes.PRODCUT_DETIAL_INIT,
            detials: detials
        });
    };
};

export const selectProductCompare = (productId, list) => {
    productId = parseInt(productId);
    if(!list) {
        list = [];
    }
    if(list.includes(productId)) {
        const indext = list.indexOf(productId);
        list.splice(indext, 1);
    } else {
        list.push(productId);
    }
    return dispatch =>{
        dispatch({
            type: actionTypes.PRODCUT_SELECT_COMPARE,
            selectedCompareIdList: list
        });
        
    };
}

export const compareProduct = (idList, productList) => {
    const selectList = []
    for(let id of idList) {
        selectList.push(productList.find(product => product.id === id));
    }
    return dispatch =>{
        dispatch({
            type: actionTypes.PRODCUT_COMPARE,
            selectedCompareProjuctList: selectList,
            redirectURL: '/compare'
        });
        
    };
}

export const initComparePage = (idList, productList) => {
    return dispatch =>{
        dispatch({
            type: actionTypes.PRODCUT_COMPARE_INIT
        });
        
    };
}





