'use strict';

import React from 'react';

class Part extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate
      .apply(this, arguments);
  }

  render() {
    let icon = this.props.icon;
    return (
      <div>
        <img src={icon.uri}/>
      </div>
    );
  }
}

Part.displayName = 'Part';
Part.propTypes = {
  icon: React.PropTypes.object
};

export default Part;
