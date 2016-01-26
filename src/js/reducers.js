import { REVEAL_CARD, HIDE_CARDS, HIDE_UNMATCHED, COMPLETE_MATCH, RENDER_CARDS, CLOSE_MODAL, SET_DIFFICULTY } from './actions';
import assign from 'lodash.assign';
import findIndex from 'lodash.findIndex';
import config from './config';

const initialState = {
  cards: [],
  isModalOpen: true,
  difficulty: config.difficulties[0].cardCount
};

const changeCardState = (state, index, change) => {
  return assign({}, state, {
    cards: [
      ...state.cards.slice(0, index),
      assign({}, state.cards[index], change),
      ...state.cards.slice(index + 1)
    ]
  });
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RENDER_CARDS:
      return assign({}, state, {
        cards: action.payload
      });

    case REVEAL_CARD:
      const index = findIndex(state.cards, card => card.id === action.payload);
      return changeCardState(state, index, {isShown: true});

    case HIDE_CARDS:
      // TODO - refactor.
      const t1 = findIndex(state.cards, card => card.id === action.payload[0].id);
      const t2 = findIndex(state.cards, card => card.id === action.payload[1].id);
      const temp2 = changeCardState(state, t1, {isShown: false});
      return changeCardState(temp2, t2, {isShown: false});

    case HIDE_UNMATCHED:
      return assign({}, state, {
        cards: state.cards.map(c => {
          c.isShown = c.isMatched;
          return c;
        })
      });

    case COMPLETE_MATCH:
      // TODO - refactor.
      const i1 = findIndex(state.cards, card => card.id === action.payload[0]);
      const i2 = findIndex(state.cards, card => card.id === action.payload[1]);
      const temp = changeCardState(state, i1, {isMatched: true, isShown: true});
      return changeCardState(temp, i2, {isMatched: true, isShown: true});

    case CLOSE_MODAL:
      return assign({}, state, {isModalOpen: false});

    case SET_DIFFICULTY:
      return assign({}, state, {difficulty: action.payload});

    default:
      return state;
  }
};
