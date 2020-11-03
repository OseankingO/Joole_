import React, { Component } from 'react';
import CategorySearch from '../CategorySearch/CategorySearch';
import './SearchPage.css';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class SearchPage extends Component {

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
            <div className='search-page'>
                <button className='logout-button' onClick={this.logoutHandler}>Logout</button>
                <div className='logo-container'>
                    <div className='block'></div>
                    <p className='logo'>JOOLE</p>
                </div>
                
                <h2 className='text'>Building Product Selection Platform</h2>
                <div className='search-area'>
                    <CategorySearch></CategorySearch>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);