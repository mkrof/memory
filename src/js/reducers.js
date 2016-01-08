import { REVEAL_CARD, HIDE_UNMATCHED, COMPLETE_MATCH } from './actions';
import shuffle from 'lodash.shuffle';
import assign from 'lodash.assign';
import findIndex from 'lodash.findIndex';
import uuid from 'uuid';

const config = {
  size: 2
};

const getCardArray = (size) => {
  const cards = Array(size)
    .fill()
    .map((c, i) => { 
      return {
        label: i,
        imgUri: 'imgUri',
        isShown: false,
        isMatched: false
      };
    });

  return shuffle(
    cards.concat(
      cards.map(card => assign({}, card))
    ).map(card => {
      card.id = uuid.v1();
      return card;
    })
  );

};

const initialState = {
  cards: getCardArray(config.size)
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REVEAL_CARD:
      const index = findIndex(state.cards, card => card.id === action.payload);

      return assign({}, state, {
        cards: [
          ...state.cards.slice(0, index),
          assign({}, state.cards[index], {isShown: true}),
          ...state.cards.slice(index + 1)
        ]
      });

    case HIDE_UNMATCHED:
      return assign({}, state, {
        cards: state.cards.map(c => {
          c.isShown = false;
          return c;
        })
      });

    case COMPLETE_MATCH:
      return state;

    default:
      return state;
  }
};
