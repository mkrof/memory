import React, { PropTypes } from 'react';

export default React.createClass({

  propTypes: {
    id: PropTypes.string,
    label: PropTypes.number,
    isShown: PropTypes.bool,
    onCardClick: PropTypes.func
  },

  render () {
    const classNames = this.props.isShown ? 'shown' : 'covered';
    return (
      <li className={classNames} onClick={() => this.props.onCardClick(this.props.id)}>
        <div className="card-img">
          {this.props.label}
        </div>
      </li>
    );
  }

});
