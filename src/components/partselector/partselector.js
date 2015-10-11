'use strict';

import React from 'react';

class PartSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate
      .apply(this, arguments);
  }

  render() {
    return (
      <div>
        <Part icon=""/>
      </div>
    );
  }
}

PartSelector.displayName = 'PartSelector';
PartSelector.propTypes = {
  parts: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default PartSelector;
