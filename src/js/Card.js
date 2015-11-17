import React from 'react';

export default React.createClass({

  propTypes: {
    num: React.PropTypes.number
  },

  render () {
    return <li>{this.props.num}</li>;
  }

});
