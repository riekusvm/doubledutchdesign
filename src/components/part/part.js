import React from 'react';

export default class Part extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  }

  render = () => {
    return (
    <div>{this.props.data.description}</div>
    );
  }
}
