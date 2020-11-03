import React, { Component } from 'react';
import CategorySearch from '../CategorySearch/CategorySearch';
import ProductList from '../ProductList/ProductList';
import SideBar from '../SideBar/SideBar';
import './ProductsDisplayPage.css';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProductsDisplayPage extends Component {

    logoutHandler = () => {
        this.props.logout();
    }

    render() {

        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to='/auth'/>;
            return (<div>{authRedirect}</div>);
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
                <div id='main-area'>
                    <div id='side-bar'>
                        <SideBar></SideBar>
                    </div>
                    <div id='main-display'>
                        <ProductList></ProductList>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDisplayPage);