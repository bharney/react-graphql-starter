import React, { Component } from 'react';
import './App.css';
import ProductList from './Product/ProductList';

class Home extends Component {
  render() {
    return (
      <div>Home
      <ProductList />
      </div>
    );
  }
}

export default Home;
