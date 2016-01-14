import store from './store';

export const REVEAL_CARD = 'memory.revealcard';
export const COMPLETE_MATCH = 'memory.completematch';
export const HIDE_UNMATCHED = 'memory.hideunmatched';
export const RENDER_CARDS = 'memory.imagedataloaded';

export const renderCards = payload => {
  return {
    type: RENDER_CARDS,
    payload
  };
};

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
  const shownCards = cards.filter(c => c.isShown && !c.isMatched);

// if the clicked card is shown or matched, do nothing.
// if there are already 2 shown unmatched cards, do nothing.
  if (clickedCard.isMatched || clickedCard.isShown || shownCards.length === 2) {
    return;
  }

// if there are no shown cards, show the clicked card.
  if (shownCards.length === 0) {
    store.dispatch(revealCard(id));
    return;
  }

// if there is one shown card
// - if the clicked card is a match, complete it.
// - if the clicked card is not a match, show it, then dispatch hide all after 2 seconds.
  if (shownCards.length === 1) {
    if (clickedCard.label === shownCards[0].label) {
      store.dispatch(completeMatch([clickedCard.id, shownCards[0].id]));
    } else {
      store.dispatch(revealCard(id));
      setTimeout(() => {
        store.dispatch(hideUnmatched([clickedCard.id, shownCards[0].id]));
      }, 1500);
    }
  }
};
