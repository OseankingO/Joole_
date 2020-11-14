import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import * as actions from '../../store/actions/index';

import './Auth.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                icon: <FaUser className='icon'/>,
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false,
                use: true
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                icon: <FaLock className='icon'/>,
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                use: true
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'confirmPassword'
                },
                icon: <FaLock className='icon'/>,
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    isSame: true
                },
                valid: false,
                touched: false,
                use: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                icon: <FaEnvelope className='icon'/>,
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false,
                use: false
            }
        },
        validButton: false,
        isSignup: false
    }

    checkValidation = (value, rules) => {
        let isValid = true;
        if(!rules) {
            return isValid;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.isSame) {
            isValid = value === this.state.controls.password.value && isValid;
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        let validCheck = true;
        for(let key in updatedControls) {
            if(updatedControls[key].use) {
                if(!updatedControls[key].valid) {
                    validCheck = false;
                    break;
                }
            }
        }
        this.setState({
            controls: updatedControls,
            validButton: validCheck
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.isSignup) {
            this.props.signUp(
                this.state.controls.username.value, 
                this.state.controls.password.value, 
                this.state.controls.email.value
            );
        } else {
            this.props.logIn(
                this.state.controls.username.value, 
                this.state.controls.password.value
            );
        }
    }

    switchAuthModeHandler = () => {
        const updatedControls = {
            ...this.state.controls,
            username: {
                ...this.state.controls.username,
                touched: false,
                value: ''
            },
            password: {
                ...this.state.controls.password,
                touched: false,
                value: ''
            },
            confirmPassword: {
                ...this.state.controls.confirmPassword,
                use: this.state.isSignup ? false : true,
                touched: false,
                value: ''
            },
            email: {
                ...this.state.controls.email,
                use: this.state.isSignup ? false : true,
                touched: false,
                value: ''
            }
        };
        this.setState({
            controls: updatedControls,
            isSignup: !this.state.isSignup
        });
        this.props.emptyMessage();
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            if(this.state.controls[key].use) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation} 
                icon = {formElement.config.icon}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p className='auth-error-message'>{this.props.error}</p>
            );
        }

        let successMessage = null;
        if(this.props.signedUp) {
            successMessage = (
                <p className='auth-success-message'>Signed Up Successfully!</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className='Auth'>
                {authRedirect}
                <div className='logo-container'>
                    <div className='block'></div>
                    <p className='logo'>JOOLE</p>
                </div>
                
                <h2 className='text'>Building Product Selection Platform</h2>
                {errorMessage}
                {successMessage}
                <form className='form' onSubmit={this.submitHandler}>
                    {form}
                    <div className='submit-button-container'>
                        {/* <Button className='submit-button' disabled={!this.state.validButton} btnType="Success">
                            SUBMIT
                        </Button> */}
                        <button className='submit-button' disabled={!this.state.validButton} >
                            {this.state.isSignup ? 'Submit' : 'Log In'}
                        </button>
                    </div>
                </form>
                <div className='switch-button-block'>
                    <button className='switch-button' onClick={this.switchAuthModeHandler}>
                        {this.state.isSignup ? 'Login' : 'Sign up'}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        signedUp: state.auth.signedUp,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logIn: (username, password) => dispatch(actions.logIn(username, password)),
        signUp: (username, password, email) => dispatch(actions.signUp(username, password, email)),
        emptyMessage: () => dispatch(actions.emptyMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);