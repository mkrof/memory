import React from 'react';
import Card from './Card';
import shuffle from 'lodash.shuffle';

export default React.createClass({
  propTypes: {
    size: React.PropTypes.number
  },
  getDefaultProps () {
    return {
      size: 10
    };
  },
  getCardArray (size) {
    const cards = Array(size).fill()
      .map((c, i) => { return i; });
    return shuffle(cards.concat(cards));
  },
  render () {
    return (
      <ul className="card-container">
        {
          this.getCardArray(this.props.size).map((c, i) => {
            return <Card num={c} key={i} />;
          })
        }
      </ul>
    );
  }
});
