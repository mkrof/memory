import React, { PropTypes } from 'react';

export default React.createClass({

  propTypes: {
    id: PropTypes.string,
    label: PropTypes.number,
    isShown: PropTypes.bool,
    isMatched: PropTypes.bool,
    imageId: PropTypes.number,
    onCardClick: PropTypes.func
  },

  render () {
    const shownCls = this.props.isShown ? 'shown' : 'covered';
    const matchedCls = this.props.isMatched ? 'matched' : '';
    const classNames = `card-container ${shownCls} ${matchedCls}`;
    const uriTemplate = `http://covers.openlibrary.org/b/id/${this.props.imageId}-L.jpg`;
    const imageStyle = {
      backgroundImage: `url(${uriTemplate})`
    };
    return (
      <li className={classNames} onClick={() => this.props.onCardClick(this.props.id)}>
        <div className="card">
          <div className="front">
          </div>
          <div className="back">
            <div className="image" style={imageStyle}></div>
          </div>
        </div>
      </li>
    );
  }
});
