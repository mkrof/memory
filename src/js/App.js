import React from 'react';

export default React.createClass({
  propTypes: {
    size: React.PropTypes.number
  },
  getDefaultProps () {
    return {
      size: 20
    };
  },
  render () {
    return <div>app {this.props.size}</div>;
  }
});
