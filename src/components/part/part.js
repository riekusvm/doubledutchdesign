import React from 'react';
import css from './part.css';
import {IMAGE_PREFIX} from '../../config/config';

export default class Part extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  }

  render = () => {
    return (
    <div className={css.part}>
      <span className={css.description}>{this.props.data.description}</span>
      <img src={IMAGE_PREFIX + this.props.data.image} />
    </div>
    );
  }
}
