import React from 'react';
import orders from '../../layerorders';
import Layer from '../../components/layer/layer';

export default class Editor extends React.Component {
  static propTypes = {
    productType: React.PropTypes.string,
    productData: React.PropTypes.object
  };

  getLayers = () => {
    let returnValue = [];
    let layers = orders[this.props.productType];
    layers.forEach((layer) => {
      let parts = [];
      if (this.props.productData.parts) {
        this.props.productData.parts.forEach((part) => {
          if (part.name === layer) {
            parts.push(part);
          }
        });
        returnValue.push(<Layer parts={parts} key={this.props.productType + '_' + layer} />);
      }
    });
    return returnValue;
  }

  render = () => {
    const layers = this.getLayers();
    return (
      <div>
        Editor
        {layers}
      </div>
    );
  }
}
