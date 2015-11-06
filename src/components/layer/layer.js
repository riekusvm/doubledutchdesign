import React from 'react';
import Part from '../part/part';
import {Link} from 'react-router';

export default class Layer extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.state = {index: 0};
  }

  static propTypes = {
    parts: React.PropTypes.array,
    data: React.PropTypes.object,
    index: React.PropTypes.number
  }

  static defaultProps = {
    index: 0
  }

  getNextButton = () => {
    return (
      <Link onClick={this.goNext}>&gt;</Link>
    );
  }

  getPreviousButton = () => {
    return (
      <Link onClick={this.goPrevious}>&lt;</Link>
    );
  }

  goPrevious = () => {
    this.go(-1);
  }

  goNext = () => {
    this.go(1);
  }

  go = (num) => {
    let newIndex = this.state.index + num;
    if (newIndex < 0) {
      newIndex = this.props.parts.length - 1;
    }
    if (newIndex > this.props.parts.length - 1) {
      newIndex = 0;
    }
    this.setState({index: newIndex});
  }

  getData = () => {
    return this.props.parts[this.state.index];
  }

  render = () => {
    const previousButton = this.getPreviousButton();
    const nextButton = this.getNextButton();
    return (
      <div>
        {this.props.parts[0].name}  ({this.props.parts.length}) <br />
        {previousButton}<Part data={this.getData()}/>{nextButton}
      </div>
    );
  }
}
