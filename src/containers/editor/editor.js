import React from 'react';
import orders from '../../config/layerorders';
import {SKU_TEMPLATE, SKU_SEPARATOR} from '../../config/config';
import Layer from '../../components/layer/layer';
import PartSelector from '../../components/partselector/partselector';

export default class Editor extends React.Component {

  prices = [];
  skuParts = [];

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
          interactive={interactive} onChange={this.partSelected} />);

        const layerIndex = this.getLayerIndex(parts[0].name);

        if (this.prices[layerIndex] === undefined) {
          this.calculatePrice(parts[0]);
        }
        if (this.skuParts[layerIndex] === undefined) {
          this.calculateSKU(parts[0]);
        }
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
      SKU: this.calculateSKU(),
      price: this.calculatePrice()
    });
  }

  partChanged = (part) => {
    this.setState({part: part});
  }

  partSelected = (layer) => {
    const sku = this.calculateSKU(layer);
    const price = this.calculatePrice(layer);
    this.setState({SKU: sku, price: price});
  }

  calculateSKU = (layer = null) => {
    if (this.state.SKU === '') {
      return this.getDefaultSKU();
    }
    if (layer !== null) {
      const index = this.getLayerIndex(layer.name);
      this.skuParts[index] = layer.id;
    }
    return this.skuParts.reduce((a, b) => {
      const sep = (a === '') ? '' : SKU_SEPARATOR;
      const bb = (b === '') ? SKU_TEMPLATE : b;
      return a + sep + bb;
    }, '');
  }

  calculatePrice = (layer = null) => {
    if (layer !== null) {
      const index = this.getLayerIndex(layer.name);
      this.prices[index] = layer.price;
    }
    return this.prices.reduce((a, b) => a + b, 0);
  }

  getLayerIndex = (name) => {
    return orders[this.props.productType].indexOf(name);
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
        <div>
          {this.state.price ? '€ ' + this.state.price : ''}
          {this.state.SKU ? ' SKU: ' + this.state.SKU : ''}
        </div>
      </div>
    );
  }
}
