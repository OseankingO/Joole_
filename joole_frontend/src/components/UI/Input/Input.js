import React from 'react';

import './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];
    
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
            />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
            />;
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
            />;
            break;
    };

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
            {props.icon}
        </div>
    );
}

export default Input;