import React from 'react';
import {Link} from 'react-router';

export default class PartSelector extends React.Component {

  static propTypes = {
    parts: React.PropTypes.array,
    onChange: React.PropTypes.func
  }

  getParts = () => {
    let returnValue = [];
    if (this.props.parts[0]) {
      this.props.parts.forEach((part) => {
        returnValue.push(<Link onClick={this.onClick.bind(this, part)} key={part}>{part} </Link>);
      });
    }
    return returnValue;
  }

  onClick = (part, event) => {
    event.preventDefault();
    this.props.onChange.apply(this, [part]);
  }

  render = () => {
    return (
      <div>
      {this.getParts()}
      </div>
    );
  }
}
