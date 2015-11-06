import React from 'react';

export default class Editor extends React.Component {
  static propTypes = {
    productType: React.PropTypes.string,
    productData: React.PropTypes.array
  };

  render = () => {
    return (
      <div>
        products: {this.props.productData.length}
      </div>
    );
  }
}
