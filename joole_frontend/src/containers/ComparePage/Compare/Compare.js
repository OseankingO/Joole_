import React, { Component } from 'react';
import './Compare.css';

import * as actions from '../../../store/actions/index';

import { connect } from 'react-redux';
import CompareForm from '../../../components/UI/CompareForm/CompareForm';

class Compare extends Component {

    state = {
        titles: null,
        products: null
    }

    componentDidMount() {
        if(this.props.selectedCompareProjuctList) {
            let title = null;
            let products = [];
            for(let product of this.props.selectedCompareProjuctList) {
                if(!title) {
                    title = {};
                    title['description'] = ['Manufacturer', 'Series', 'Model'];
                    let typeList = [];
                    for(let type of product.type) {
                        typeList.push({
                            id: type.id,
                            value: type.name,
                            extraValue: null
                        });
                    }
                    title['type'] = typeList;
                    let techList = [];
                    for(let tech of product.technicalspecifications) {
                        techList.push({
                            id: tech.id,
                            value: tech.name,
                            extraValue: null
                        });
                    }
                    // technical specifications
                    title['technical'] = techList
                }
                let tmpP = {};
                tmpP['description'] = [product.brand, product.series, product.model];
                let pTypeList = [];
                for(let type of title['type']) {
                    let tmpType = product.type.find(t => t.id === type.id);
                    pTypeList.push({
                        id: tmpType.id,
                        value: tmpType.value,
                        extraValue: tmpType.extraValue
                    });
                }
                tmpP['type'] = pTypeList;
                let pTechList = [];
                for(let type of title['technical']) {
                    let tmpType = product.technicalspecifications.find(t => t.id === type.id);
                    pTechList.push({
                        id: tmpType.id,
                        value: tmpType.value,
                        extraValue: tmpType.extraValue
                    });
                }
                tmpP['technical'] = pTechList;
                products.push(tmpP);
            }
            this.setState({
                titles: title,
                products: products
            });
        }
        

    }

    render() {
        let titleForm = null;
        if(this.state.titles) {
            titleForm = <CompareForm 
                isTitle={true}
                descriptions={this.state.titles['description']}
                types={this.state.titles['type']}
                technical={this.state.titles['technical']}
            />
        }
        let productForm = null;
        if(this.state.products) {
            productForm = this.state.products.map(product => (
                <CompareForm 
                    isTitle={false}
                    descriptions={product['description']}
                    types={product['type']}
                    technical={product['technical']}
                />
            ));
        }
        return (
            <div className='compare-form-area'>
                {titleForm}
                {productForm}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedCompareProjuctList: state.product.selectedCompareProjuctList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // initProductDetial: (productId) => dispatch(actions.initProductDetial(productId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);