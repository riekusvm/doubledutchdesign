import React from 'react';
import orders from '../../config/layerorders';
import Layer from '../../components/layer/layer';
import PartSelector from '../../components/partselector/partselector';

export default class Editor extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.state = {
      part: ''
    }
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
        returnValue.push(<Layer zIndex={index} parts={parts}
          key={this.props.productType + '_' + layer} />);
      }
    });
    return returnValue;
  }

  getParts = () => {
    const parts = orders[this.props.productType];
    return <PartSelector parts={parts} onPartChange={this.partChanged} />;
  }

  componentWillMount = () => {
    console.log('will mount');
    this.setState({part: orders[this.props.productType][0]});
  }

  partChanged = (part, event) => {
    console.log('part changed ',part);
    this.setState({part: part});
  }

  render = () => {
    const layers = this.getLayers();
    const parts = this.getParts();
    return (
      <div>
        <div>
          {parts}
        </div>
        <div>
          Editor
          {layers}
        </div>
      </div>
    );
  }
}
