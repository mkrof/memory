import store from './store';

export const REVEAL_CARD = 'memory.completematch';
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

  if (clickedCard.isMatched || clickedCard.isShown) {
    return;
  }

  const shownCards = cards.filter(c => c.isShown && !c.isMatched);

  if (shownCards.length === 1 && shownCards[0].label === clickedCard.label) {
    store.dispatch(completeMatch(id, shownCards[0].id));
  } else if (shownCards.length <= 1) {
    store.dispatch(revealCard(id));
  } else {
    store.dispatch(hideUnmatched());
  }

};
