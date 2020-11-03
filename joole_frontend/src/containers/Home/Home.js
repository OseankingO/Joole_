import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <Redirect to='/auth' />
            </div>
        );
    }
}

export default Home;