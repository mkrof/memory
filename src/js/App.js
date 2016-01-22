import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Card from './Card';
import { onCardClick, onDifficultyChange, startGame } from './actions';
import config from './config';

const App = React.createClass({

  propTypes: {
    cards: PropTypes.array,
    isModalOpen: PropTypes.bool,
    difficulty: PropTypes.number
  },

  render () {
    return (
      <div>
        <ul className="cards">
          {
            this.props.cards.map((c, i) => {
              return <Card { ...c } key={ i } onCardClick={ onCardClick } />;
            })
          }
        </ul>
        <Modal isOpen={ this.props.isModalOpen }>
          <h2>hello</h2>
          <form>
            {
              config.difficulties.map((d, i) => {
                const id = `difficulty-${i}`
                return <p key={ i }>
                  <input type="radio" 
                    name="difficulty"
                    id={ id } 
                    label={ d.label } 
                    value={ d.cardCount } 
                    checked={ this.props.difficulty === d.cardCount }
                    onChange={ e => onDifficultyChange(e.target.value) }
                  />
                  <label htmlFor={ id }>{ d.label }</label>
                </p>
              })
            }
          </form>
          <button onClick={ () => startGame(5) }>Start</button>
        </Modal>
      </div>
    );
  }

});

export default connect(state => state)(App);
