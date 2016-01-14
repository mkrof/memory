import { render } from 'react-dom';
import React from 'react';
import shuffle from 'lodash.shuffle';
import compact from 'lodash.compact';
import assign from 'lodash.assign';
import uuid from 'uuid';
import { renderCards } from './actions';
import {} from '../sass/app.scss';
import App from './App';
import store from './store';

const config = {
  size: 4,
  searchUri:'http://openlibrary.org/search.json?q=amphibians'
};

const fetchBooks = () => fetch(config.searchUri);

const parseBooks = (books) => {
  const coverIds = compact(
    books.docs.map(book => {
      if (book.cover_i) return book.cover_i;
    })
  );

  console.log(coverIds.length);
  console.log(coverIds);
  return shuffle(coverIds);
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

fetchBooks().then(response => response.json())
  .then(parseBooks)
  .then(coverIds => {
    store.dispatch(renderCards(getCardArray(coverIds, config.size)));
  });

render(
  <App store={store}/>,
  document.getElementById('app-container')
);
