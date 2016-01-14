import React, { PropTypes } from 'react';
import Card from './Card';
import { onCardClick } from './actions';
import { connect } from 'react-redux';

const App = React.createClass({

  propTypes: {
    cards: PropTypes.array
  },

  handleClick (id) {
    onCardClick(id);
  },

  render () {
    return (
      <ul className="cards">
        {
          this.props.cards.map((c, i) => {
            return <Card {...c} key={i} onCardClick={this.handleClick} />;
          })
        }
      </ul>
    );
  }

});

export default connect(
  state => ({
    cards: state.cards
  })
)(App);
