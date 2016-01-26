import shuffle from 'lodash.shuffle';
import compact from 'lodash.compact';
import assign from 'lodash.assign';
import uuid from 'uuid';
import store from './store';
import config from './config';

export const REVEAL_CARD = 'memory.revealcard';
export const COMPLETE_MATCH = 'memory.completematch';
export const HIDE_UNMATCHED = 'memory.hideunmatched';
export const RENDER_CARDS = 'memory.rendercards';
export const CLOSE_MODAL = 'memory.closemodal';
export const SET_DIFFICULTY = 'memory.setdifficulty';

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

export const closeModal = payload => {
  return {
    type: CLOSE_MODAL,
    payload
  };
};

export const setDifficulty = difficulty => {
  return {
    type: SET_DIFFICULTY,
    payload: parseInt(difficulty, 10)
  };
};

const fetchBooks = () => fetch(config.searchUri);

const parseBooks = (books) => {
  return compact(
    books.docs.map(book => {
      if (book.cover_i) return book.cover_i;
    })
  );
};

const getCardArray = (coverIds, size) => {
  const cards = Array(size)
    .fill()
    .map((c, i) => { 
      return {
        label: i,
        imageId: coverIds[i],
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

export const startGame = difficulty => {
  console.log('starting', store.getState().difficulty);
  store.dispatch(closeModal());
  fetchBooks().then(response => response.json())
    .then(parseBooks)
    .then(coverIds => {
      store.dispatch(renderCards(getCardArray(coverIds, store.getState().difficulty)));
    });
};

export const onDifficultyChange = difficulty => {
  store.dispatch(setDifficulty(difficulty));
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
      }, config.showCardDuration);
    }
  }
};
