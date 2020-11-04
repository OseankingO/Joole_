import React, { Component } from 'react';
import './ProductList.css';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Product from '../../components/Product/Product';

class ProductList extends Component {

    state = {
    }

    inite() {
        if(this.props.categoryId) {
            this.props.getCategoryName(this.props.categoryId);
        }
        let idList = []
        for(let key in this.props.productLineList) {
            idList.push(this.props.productLineList[key].id)
        }
        if(idList.length !== 0) {
            this.props.getProductList(idList);
            this.props.updated();
        }
    }

    async componentDidMount() {
        this.inite();
    }

    componentDidUpdate() {
        if(this.props.needUpdate) {
            this.inite();
        }
    }

    projectClickedHandler = (product) => {
        this.props.selectProduct(product, this.props.categoryName);
    }

    checkBoxChangeHandler = (event) => {
        this.props.selectProductCompare(event.target.value, this.props.selectedCompareIdList);
    }
    
    compareClickedHandler = () => {
        if(this.props.selectedCompareIdList && this.props.selectedCompareIdList.length > 1) {
            this.props.compareProduct(this.props.selectedCompareIdList, this.props.productList);
        } else {
            alert('Please Select At Least Two Products!')
        }
        
    }
    
    render() {

        let redirect = null;
        if (this.props.redirectURL) {
            redirect = <Redirect to={this.props.redirectURL}/>
        }

        const lastInput = this.props.inputValue;

        let products = null;
        if(this.props.productList) {
            products = this.props.productList.map(product => (
                <Product 
                    key={product.id} 
                    id={product.id} 
                    series={product.series} 
                    model={product.model}
                    brand={product.brand}
                    properties= {product.technicalspecifications} 
                    clicked={() => this.projectClickedHandler(product)}
                    checkChange={(event) => this.checkBoxChangeHandler(event)}
                    // pic = {}
                />
            ));
        }
        
        return (
            <div id='product-list-area'>
                {redirect}
                <div class='product-list-info-container'>
                    <span className='cat-name'>{this.props.categoryName + ' > '}</span>
                    <span className='last-input-value'>{lastInput}</span>
                    <button className='compare-button' onClick={this.compareClickedHandler}>Compare</button>
                </div>
                <div id='product-list-display-container'>
                    {products}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categoryId: state.category.categoryId,
        categoryName: state.category.categoryName,
        inputValue: state.category.inputValue,
        productLineList: state.category.searchResults,
        needUpdate: state.category.needUpdate,
        productList: state.product.productList,
        redirectURL: state.product.redirectURL,
        selectedCompareIdList: state.product.selectedCompareIdList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductList: (idList) => dispatch(actions.getProductList(idList)),
        getCategoryName: (categoryId) => dispatch(actions.getCategoryName(categoryId)),
        updated: () => dispatch(actions.searchUpdated()),
        selectProduct: (product, categoryName) => dispatch(actions.selectProduct(product, categoryName)),
        selectProductCompare: (productId, list) => dispatch(actions.selectProductCompare(productId, list)),
        compareProduct: (idList, productList) => dispatch(actions.compareProduct(idList, productList)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);