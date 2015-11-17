import React from 'react';

export default React.createClass({
  propTypes: {
    size: React.PropTypes.number
  },
  getDefaultProps () {
    return {
      size: 50
    };
  },
  render () {
    return <div>app {this.props.size}</div>;
  }
});
