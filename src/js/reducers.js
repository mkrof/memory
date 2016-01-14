import { REVEAL_CARD, HIDE_UNMATCHED, COMPLETE_MATCH } from './actions';
import shuffle from 'lodash.shuffle';
import assign from 'lodash.assign';
import findIndex from 'lodash.findIndex';
import uuid from 'uuid';

const config = {
  size: 4
};

const images = [
  'https://pixabay.com/static/uploads/photo/2015/10/13/12/28/frog-986026_960_720.jpg',
  'https://c2.staticflickr.com/4/3040/2554232489_2af929eaf1.jpg',
  'http://opencage.info/pics/files/800_1909.jpg',
  'https://c2.staticflickr.com/4/3417/3385110196_d208c4595a.jpg'
];

const getCardArray = (size) => {
  const cards = Array(size)
    .fill()
    .map((c, i) => { 
      return {
        label: i,
        imageUri: images[i],
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
    case REVEAL_CARD:
      const index = findIndex(state.cards, card => card.id === action.payload);
      return changeCardState(state, index, {isShown: true});

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

    default:
      return state;
  }
};
