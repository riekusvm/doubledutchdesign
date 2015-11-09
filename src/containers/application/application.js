import React from 'react';
import css from './application.css';
import Editor from '../editor/editor';
import data from '../../mock-data';

export default class Application extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: []
  //   };
  // }

  // componentWillMount = () => {
  //   let products = [];
  //   $.ajax({
  //     url: 'http://double-dutch-design.myshopify.com/products.json',
  //       dataType: 'json',
  //       cache: false,
  //     success: function(data) {
  //       products = data.products;
  //     }.bind(this),
  //       error: function(xhr, status, err) {
  //         // console.error('http://double-dutch-design.myshopify.com/products.json',
  //          status, err.toString());
  //     }.bind(this)
  //   }).then(() => {
  //     // Format the product
  //     this.setState({products: products});
  //   });
  // }

  getProducts = () => {
    // console.log(this.state.products);
    // return this.state.products;
    // let products = [];
    // this.state.products.map(function(product) {
    //   products.push(<div>{product}</div>);
    //   console.log(product);
    // });
    // return products;
  }

  render = () => {
    // let products = this.getProducts();
    return (
      <div className={css.application}>
        <Editor productType="BRA" productData={data[0]} />
      </div>
    );
  }
}
