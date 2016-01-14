import React, { PropTypes } from 'react';

export default React.createClass({

  propTypes: {
    id: PropTypes.string,
    label: PropTypes.number,
    isShown: PropTypes.bool,
    isMatched: PropTypes.bool,
    imageUri: PropTypes.string,
    onCardClick: PropTypes.func
  },

  render () {
    const shownCls = this.props.isShown ? 'shown' : 'covered';
    const matchedCls = this.props.isMatched ? 'matched' : '';
    const classNames = `card-container ${shownCls} ${matchedCls}`;
    const backStyle = {
      backgroundImage: `url(${this.props.imageUri})`,
      backgroundSize: 'cover'
    };
    return (
      //<li className={classNames} onClick={() => this.props.onCardClick(this.props.id)}>
      <li className={classNames} onClick={() => this.props.onCardClick(this.props.id)}>
        <div className="card">
          <div className="front">
          </div>
          <div className="back" style={backStyle}>
          </div>
        </div>
      </li>
    );
  }
});
