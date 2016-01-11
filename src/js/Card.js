import React, { PropTypes } from 'react';

export default React.createClass({

  propTypes: {
    id: PropTypes.string,
    label: PropTypes.number,
    isShown: PropTypes.bool,
    isMatched: PropTypes.bool,
    onCardClick: PropTypes.func
  },

  render () {
    const shownCls = this.props.isShown ? 'shown' : 'covered';
    const matchedCls = this.props.isMatched ? 'matched' : '';
    const classNames = `${shownCls} ${matchedCls}`;
    return (
      <li className={classNames} onClick={() => this.props.onCardClick(this.props.id)}>
        <div className="card-img">
          {this.props.label}
        </div>
      </li>
    );
  }

});
