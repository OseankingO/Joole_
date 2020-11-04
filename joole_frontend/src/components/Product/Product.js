import React from 'react';

import './Product.css';

const Product = (props) => {
    
    // <Product 
    //     key={product.id} 
    //     id={product.id} 
    //     // pic = {}
    // />

    

    return (
        <div className='project-container'>
            <div className='product-picture-container' onClick={props.clicked}>picture</div>
            <div className='description-container' onClick={props.clicked}>
                <p className='description'>{props.brand}</p>
                <p className='description'>{props.series}</p>
                <p className='description'>{props.model}</p>
            </div>
            <div className='properties-container' onClick={props.clicked}>
                {props.properties.map(property => (
                    property.extraValue ? <p key={property.id} className='properties'>{property.name} max: {property.extraValue}</p> : <p key={property.id} className='properties'>{property.name}: {property.value}</p>
                ))}
            </div>
            <div className='extra-properties-container' onClick={props.clicked}>
                <p className='extra-properties'>I don't know that is in here</p>
                <p className='extra-properties'>I don't know that is in here</p>
            </div>
            <div className='project-bottom-container'>
                <div>
                    <input 
                        type="checkbox" 
                        id={'compare-' + props.id.toString()} 
                        value={props.id} 
                        onChange={event => props.checkChange(event)}
                    />
                    <label>Compare</label> 
                </div>
                <button className='project-add-button'>Add to</button>   
            </div>
        </div>
    );
}

export default Product;