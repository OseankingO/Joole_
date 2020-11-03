import React from 'react';

import './Product.css';

const Product = (props) => {
    
    // <Product 
    //     key={product.id} 
    //     id={product.id} 
    //     // pic = {}
    // />

    

    return (
        <div className='project-container' onClick={props.clicked}>
            <div className='product-picture-container'>picture</div>
            <div className='description-container'>
                <p className='description'>{props.brand}</p>
                <p className='description'>{props.series}</p>
                <p className='description'>{props.model}</p>
            </div>
            <div className='properties-container'>
                {props.properties.map(property => (
                    property.extraValue ? <p key={property.id} className='properties'>{property.name} max: {property.extraValue}</p> : <p key={property.id} className='properties'>{property.name}: {property.value}</p>
                ))}
            </div>
            <div></div>
        </div>
    );
}

export default Product;