import React from 'react';

import './CompareForm.css';

const CompareForm = (props) => {

    console.log(props);
    return (
        <div className='compare-form'>
            <div className='compare-form-block compare-form-picture-container'>
                {props.isTitle ? 
                    <div></div> 
                    : <div className='compare-form-picture'>
                        <p className='compare-form-picture-text'>Picture</p>
                    </div>
                }
            </div>
            <div className='compare-form-block'>
                <p className='compare-form-item-underline compare-form-item-left compare-form-item'>{props.isTitle ? 'DESCRIPTION' : null}</p>
                {props.descriptions.map(name => (
                    <p className={props.isTitle ? 'compare-form-item-left compare-form-item-gray compare-form-item' : 'compare-form-item'} key={name}>{name}</p>
                ))}
            </div >
            <div className='compare-form-block'>
                <p className='compare-form-item-underline compare-form-item-left compare-form-item'>{props.isTitle ? 'TYPE' : null}</p>
                {props.types.map(type => (
                    <div key={type.id} className='compare-form-item'>
                        {type.extraValue ? 
                            <div className='compare-form-two-value'>
                                <p className='compare-form-item-gray compare-form-item'>Min</p>
                                <p className='compare-form-item'>{type.value}</p>
                                <p className='compare-form-item-gray compare-form-item'>Max</p>
                                <p className='compare-form-item'>{type.extraValue}</p>
                            </div> 
                            : <p 
                            className={props.isTitle ? 
                                    'compare-form-item-left compare-form-item-gray compare-form-item' 
                                    : 'compare-form-item'
                                }
                            >
                                {type.value}
                            </p>
                        }
                    </div>
                ))}
            </div>
            <div className='compare-form-block'>
                <p className='compare-form-item-underline compare-form-item-left compare-form-item'>{props.isTitle ? 'TECHNICAL SPECIFICATIONS' : null}</p>
                {props.technical.map(type => (
                    <div key={type.id} className='compare-form-item'>
                        {type.extraValue ? 
                            <div className='compare-form-two-value'>
                                <p className='compare-form-item-gray compare-form-item'>Min</p>
                                <p className='compare-form-item'>{type.value}</p>
                                <p className='compare-form-item-gray compare-form-item'>Max</p>
                                <p className='compare-form-item'>{type.extraValue}</p>
                            </div> 
                            : <p 
                                className={props.isTitle ? 
                                    'compare-form-item-left compare-form-item-gray compare-form-item' 
                                    : 'compare-form-item'
                                }
                            >
                                {type.value}
                            </p>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

// isTitle='title' 
// descriptions={this.state.titles['description']}
// types={this.state.titles['type']}
// technical={this.state.titles['technical']}

export default CompareForm;