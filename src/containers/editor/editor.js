import React from 'react';
import orders from '../../config/layerorders';
import {SKU_TEMPLATE, SKU_SEPARATOR} from '../../config/config';
import Layer from '../../components/layer/layer';
import PartSelector from '../../components/partselector/partselector';

export default class Editor extends React.Component {

  SKU = '';

  constructor(props, state) {
    super(props, state);
    this.state = {
      part: '',
      SKU: '',
      price: ''
    };
  }

  static propTypes = {
    productType: React.PropTypes.string,
    productData: React.PropTypes.object
  };

  getLayers = () => {
    let returnValue = [];
    let layers = orders[this.props.productType];
    // layer z-index
    let index = 100;
    layers.forEach((layer) => {
      if (this.props.productData.parts) {
        index = index + 1;
        let parts = this.getLayerParts(layer);
        let interactive = this.isCurrentPart(layer);
        returnValue.push(<Layer zIndex={index} parts={parts}
          key={this.props.productType + '_' + layer}
          interactive={interactive} onChange={this.partSelected}/>);
      }
    });

    return returnValue;
  }

  getLayerParts = (layer) => {
    let parts = [];
    this.props.productData.parts.forEach((part) => {
      if (part.name === layer) {
        parts.push(part);
      }
    });
    return parts;
  }

  isCurrentPart = (part) => {
    return part === this.state.part;
  }

  getPartSelector = () => {
    const parts = orders[this.props.productType];
    return <PartSelector parts={parts} onChange={this.partChanged} />;
  }

  componentWillMount = () => {
    this.setState({
      part: orders[this.props.productType][0],
      SKU: this.getDefaultSKU()
    });
  }

  partChanged = (part) => {
    this.setState({part: part});
  }

  partSelected = (layer) => {
    let layerIndex = orders[this.props.productType].indexOf(layer.name);
    let skuParts = this.state.SKU.split(SKU_SEPARATOR);
    skuParts[layerIndex] = layer.id;
    this.setState({SKU: skuParts.join(SKU_SEPARATOR)});
  }

  getDefaultSKU = () => {
    let partials = [];
    orders[this.props.productType].forEach(() => {
      partials.push(SKU_TEMPLATE);
    });
    return partials.join(SKU_SEPARATOR);
  }

  render = () => {
    return (
      <div>
        <div>
          {this.getPartSelector()}
        </div>
        <div>
          {this.getLayers()}
        </div>
      </div>
    );
  }
}
