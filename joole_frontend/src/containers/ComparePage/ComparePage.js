import React, { Component } from 'react';
import './ComparePage.css';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CategorySearch from '../CategorySearch/CategorySearch';
import Compare from './Compare/Compare';

class ComparePage extends Component {

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.initComparePage();
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
                        <span className='cat-name'>{this.props.inputValue + ' > '}</span>
                        <span className='last-input-value'>Compare</span>
                    </div>
                    <div>
                        <Compare></Compare>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        inputValue: state.category.inputValue,
        categoryName: state.category.categoryName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        initComparePage: () => dispatch(actions.initComparePage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);