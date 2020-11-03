import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import ProductDetial from './containers/ProductDetial/ProductDetial';
import ProductsDisplayPage from './containers/ProductsDisplayPage/ProductsDisplayPage';
import SearchPage from './containers/SearchPage/SearchPage';

class App extends Component {

  render () {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/search' component={SearchPage} />
        <Route path='/main' component={ProductsDisplayPage} />
        <Route path='/detial' component={ProductDetial} />
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
      </Switch>
    );

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
  
}

export default App;
