import React from 'react';
import Part from '../part/part';
import {Link} from 'react-router';
import css from './layer.css';

export default class Layer extends React.Component {

  constructor(props, state) {
    super(props, state);
    this.state = {index: 0};
  }

  static propTypes = {
    parts: React.PropTypes.array,
    zIndex: React.PropTypes.number,
    interactive: React.PropTypes.bool
  }

  getNextButton = () => {
    if (this.props.interactive) {
      return (
        <Link onClick={this.goNext} className={css.next}>&gt;</Link>
      );
    }
  }

  getPreviousButton = () => {
    if (this.props.interactive) {
      return (
        <Link onClick={this.goPrevious} className={css.previous}>&lt;</Link>
      );
    }
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
    return (
      <div className={css.layer}>
        {this.getPreviousButton()}
        <div className={css.content} style={{zIndex: this.props.zIndex}}>
          <Part data={this.getData()}/>
        </div>
        {this.getNextButton()}
      </div>
    );
  }
}
