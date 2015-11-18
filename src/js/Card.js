import React from 'react';

export default React.createClass({

  propTypes: {
    num: React.PropTypes.number
  },

  getInitialState () {
    return {
      shown: false
    };
  },

  onCardClick () {
    console.log(`${this.props.num} clicked`);
    this.setState({shown: !this.state.shown});
  },

  render () {
    let classNames = this.state.shown ? 'shown' : 'covered';
    return (
      <li className={classNames} onClick={this.onCardClick}>
        <div className="card-img">
          {this.props.num}
        </div>
      </li>
    );
  }

});
