import React, { Component } from 'react';
import './ProductDetial.css';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CategorySearch from '../CategorySearch/CategorySearch';

class ProductDetial extends Component {

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.initProductDetial(this.props.selectedProduct.id);
        }
        
    }

    logoutHandler = () => {
        this.props.logout();
    }

    render() {

        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to='/auth'/>
            return (<div>{authRedirect}</div>);
        }
        
        let discForm = null;
        if(this.props.selectedProduct) {
            discForm = 
                <div className='product-info-row-list'>
                    <div className='product-info-row'>
                        <p className='info-item info-name'>Manufacturer</p>
                        <p className='info-item info-text'>{this.props.selectedProduct.brand}</p>
                    </div>
                    <div className='product-info-row'>
                        <p className='info-item info-name'>Series</p>
                        <p className='info-item info-text'>{this.props.selectedProduct.series}</p>
                    </div>
                    <div className='product-info-row'>
                        <p className='info-item info-name'>Model</p>
                        <p className='info-item info-text'>{this.props.selectedProduct.model}</p>
                    </div>
                </div>;
        }

        let typeForm = null;
        if(this.props.selectedProduct.type) {
            typeForm = 
                <div className='product-info-row-list'>
                    {this.props.selectedProduct.type.map(type => (
                        <div key={type.id} className='product-info-row'>
                            <p className='info-item info-name'>{type.name}</p>
                            {type.extraValue ?  
                                <div className='product-info-min-max'>
                                    <p className='info-item info-name'>Min</p>
                                    <p className='info-item info-text'>{type.value}</p>
                                    <p className='info-item info-name'>Max</p>
                                    <p className='info-item info-text'>{type.extraValue}</p>
                                </div>
                            : <p className='info-item info-text'>{type.value}</p>}
                        </div>
                    ))}
                </div>;
        }

        let techForm = null;
        if(this.props.selectedProduct.technicalspecifications) {
            techForm = 
                <div className='product-info-row-list'>
                    {this.props.selectedProduct.technicalspecifications.map(type => (
                        <div key={type.id} className='product-info-row'>
                            <p className='info-item info-name'>{type.name}</p>
                            {type.extraValue ?  
                                <div className='product-info-min-max'>
                                    <p className='info-item info-name'>Min</p>
                                    <p className='info-item info-text'>{type.value}</p>
                                    <p className='info-item info-name'>Max</p>
                                    <p className='info-item info-text'>{type.extraValue}</p>
                                </div>
                            : <p className='info-item info-text'>{type.value}</p>}
                        </div>
                    ))}
                </div>;
        }

        let detialForm = null;
        if(this.props.detials) {
            detialForm = 
                <div className='product-info-row-list'>
                    {this.props.detials.map((detial, index) => (
                        <p key={detial.id} className={index % 2 === 0 ? 'info-item info-name' : 'info-item info-text'}>{detial.text}</p>
                    ))}
                </div>;
        }

        return (
            <div id='product-display-page'>
                <button className='logout-button' onClick={this.logoutHandler}>Logout</button>
                <div id='header'>
                    <p className='logo-small'>JOOLE</p>
                    <div id='search-area'>
                        <CategorySearch></CategorySearch>
                    </div>
                </div>
                <div className='product-display-container'>
                    <div id='product-display-info-container' class='product-list-info-container'>
                        <span className='cat-name'>{this.props.categoryName + ' > '}</span>
                        <span className='cat-name'>{this.props.productLineName + ' > '}</span>
                        <span className='last-input-value'>{this.props.selectedProduct.model}</span>
                    </div>
                    <div className='product-list-info-container'>
                        <span className='small-picture'>Picture</span>
                        <span className='cat-name'>{this.props.categoryName + ' / '}</span>
                        <span className='cat-name'>{this.props.productLineName + ' / '}</span>
                        <span className='cat-name'>{this.props.selectedProduct.model}</span>
                        <span className='cat-name-red'>I don't know what's this</span>
                        <button className='header-button project-add-button'>Add to</button>  
                    </div>
                    <div className='product-detial-display-area'>
                        <h1 className='product-detial-header'>Product Summary</h1>
                        <div className='brief-info'>
                            <div className='brief-info-side'>
                                <div className='info-form'>
                                    <h3 className='product-detial-subheader'>DESCRIPTION</h3>
                                    {discForm}
                                </div>
                                <div className='info-form'>
                                    <h3 className='product-detial-subheader'>TYPE</h3>
                                    {typeForm}
                                </div>
                            </div>
                            <div className='brief-info-side'>
                                <div className='info-form'>
                                    <h3 className='product-detial-subheader'>TECHNICAL SPECIFICATIONS</h3>
                                    {techForm}
                                </div>
                            </div>
                        </div>
                        <h1 className='product-detial-header'>Product Detials</h1>
                        <div>
                            <h3 className='product-detial-subheader'>SERIES INFORMATION</h3>
                            {detialForm}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        selectedProduct: state.product.selectedProduct,
        detials: state.product.detials,
        productLineName: state.product.productLineName,
        categoryName: state.product.categoryName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initProductDetial: (productId) => dispatch(actions.initProductDetial(productId)),
        logout: () => dispatch(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetial);