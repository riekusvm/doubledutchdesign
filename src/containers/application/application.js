import React from 'react';
import css from './application.css'

export default class Application extends React.Component {
  render = () => {
    return (
      <div className={css.application}>EPIC APPLICATION</div>
    );
  }
}
