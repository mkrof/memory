import React from 'react';
import Card from './Card';

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
    return (
      <ul className="card-container">
        {
          Array(this.props.size).fill().map((c, i) => {
            return <Card num={i} key={i} />;
          })
        }
      </ul>
    );
  }
});
