import React from 'react';
import orders from '../../config/layerorders';
import Layer from '../../components/layer/layer';
import PartSelector from '../../components/partselector/partselector';

export default class Editor extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.state = {
      part: ''
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
      let parts = [];
      if (this.props.productData.parts) {
        index = index + 1;
        this.props.productData.parts.forEach((part) => {
          if (part.name === layer) {
            parts.push(part);
          }
        });
        let interactive = this.isCurrentPart(layer);
        returnValue.push(<Layer zIndex={index} parts={parts}
          key={this.props.productType + '_' + layer}
          interactive={interactive} />);
      }
    });
    return returnValue;
  }

  isCurrentPart = (part) => {
    return part === this.state.part;
  }

  getParts = () => {
    const parts = orders[this.props.productType];
    return <PartSelector parts={parts} onPartChange={this.partChanged} />;
  }

  componentWillMount = () => {
    this.setState({part: orders[this.props.productType][0]});
  }

  partChanged = (part) => {
    this.setState({part: part});
  }

  render = () => {
    return (
      <div>
        <div>
          {this.getParts()}
        </div>
        <div>
          {this.getLayers()}
        </div>
      </div>
    );
  }
}
