import React, { Component } from 'react';
import './CategorySearch.css';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class CategorySearch extends Component {

    state = {
        inputProductLine: '',
        inputCategoryId: 0
    }

    componentDidMount() {
        if(!this.props.categoryId) {
            this.props.onInitSearchData();
        }
    }

    inputChangedHandler = (event) => {
        this.setState({
            inputProductLine: event.target.value
        });
    };

    enterInputHandler = (event) => {
        if(event.key === 'Enter') {
            this.props.search(this.state.inputProductLine, this.props.categoryId);
        }
    }

    selectChangeHandler = (event) => {
        this.props.changeCategory(event.target.value);
    }

    render() {
        let redirect = null;
        if (this.props.redirectPath) {
            redirect = <Redirect to={this.props.redirectPath}/>
            this.props.resetRedirectPath();
        }

        if(this.props.searchEmpty) {
            alert('No Item Found!');
            this.props.alertedEmpty();
        }

        let categoryList = this.props.categoryList;
        let selectList = null;
        if(categoryList) {
            selectList = (
                <div id='select-list-container'>
                    <select 
                        id='select-list' 
                        value={this.props.categoryId} 
                        onChange={this.selectChangeHandler}
                    >
                        {categoryList.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            );
        }

        let productLineList = this.props.productLineList;
        let searchBar = null;
        if(productLineList) {
            searchBar = (
                <div id='search-bar-container'>
                    <input 
                        id='search-bar' 
                        list='project-lines' 
                        value={this.state.inputProductLine} 
                        onChange={this.inputChangedHandler} 
                        onKeyDown={this.enterInputHandler} 
                        placeholder='search...'
                    />
                    <datalist id='project-lines'>
                        {productLineList.map((projectLine) => {
                            return(<option key={projectLine.id} className='option' value={projectLine.name} />);
                            
                        })}
                    </datalist>
                </div>
            );
        }

        return (
            <div id='search-area'>
                {redirect}
                {selectList}
                {searchBar}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null,
        categoryId: state.category.categoryId,
        categoryList: state.category.categoryList,
        productLineList: state.category.productLineList,
        searchEmpty: state.category.searchEmpty,
        redirectPath: state.category.redirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitSearchData: () => dispatch(actions.onInitSearchData()),
        changeCategory: (categoryId) => dispatch(actions.changeCategory(categoryId)),
        search: (inputProductLine, categoryId) => dispatch(actions.search(inputProductLine, categoryId)),
        alertedEmpty: () => dispatch(actions.alertedEmpty()),
        resetRedirectPath: () => dispatch(actions.resetRedirectPath())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySearch);