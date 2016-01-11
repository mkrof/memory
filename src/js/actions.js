import store from './store';

export const REVEAL_CARD = 'memory.revealcard';
export const COMPLETE_MATCH = 'memory.completematch';
export const HIDE_UNMATCHED = 'memory.hideunmatched';

export const revealCard = id => {
  return {
    type: REVEAL_CARD,
    payload: id
  };
};

export const completeMatch = payload => {
  return {
    type: COMPLETE_MATCH,
    payload
  };
};

export const hideUnmatched = payload => {
  return {
    type: HIDE_UNMATCHED,
    payload
  };
};

export const onCardClick = id => {

  const cards = store.getState().cards;
  const clickedCard = cards.filter(c => c.id === id)[0];
  const shownCard = cards.filter(c => c.isShown && !c.isMatched)[0];

  if (clickedCard.isMatched || clickedCard.isShown) {
    return;
  }

  if (!shownCard) {
    store.dispatch(revealCard(id));
    return;
  }

  if (clickedCard.label === shownCard.label) {
    store.dispatch(completeMatch([clickedCard.id, shownCard.id]));
  } else {
    //todo - add a pause
    store.dispatch(hideUnmatched([clickedCard.id, shownCard.id]));
  }
};
