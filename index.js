import {app} from 'hyperapp';
import {div, h1, h2, ul, li, span} from '@hyperapp/html';

const mdash = '\u2014';
const MAX_BAD_GUESSES = 7;

// UTILITIES

const contains = (list, item) => list.indexOf(item) > -1;

// HELPERS
const isGuessed = (letter, state) => contains(state.guesses, letter);
const isInWord = (letter, state) => contains(state.word, letter);

const badGuesses = state =>
  state.guesses.filter(guess => !isInWord(guess, state));

const isVictorious = state =>
  state.word.every(letter => isGuessed(letter, state));

const isGameOver = state => badGuesses(state).length >= MAX_BAD_GUESSES;

// EFFECTS

// ACTIONS

// VIEWS

const WordLetter = (letter, guessed) =>
  span({class: 'letter'}, guessed ? letter : mdash);

const Word = state =>
  h1(
    {},
    state.word.map(letter => WordLetter(letter, isGuessed(letter, state))),
  );

const BadGuesses = state => [
  h2({}, 'Your Guesses:'),
  ul(
    {class: 'guesses'},
    badGuesses(state).map(guess => li({class: 'guess'}, guess)),
  ),
];

// THE APP

app({
  init: {
    word: 'application'.split(''),
    guesses: ['a', 'p', 'l', 'i', 'c', 't', 'o', 'n'],
  },
  view: state =>
    div(
      {},
      isGameOver(state)
        ? h1({}, `Game Over! The word was "${state.word.join('')}"`)
        : isVictorious(state)
        ? [h1({}, 'You Won!'), Word(state)]
        : [Word(state), BadGuesses(state)],
    ),
  node: document.getElementById('app'),
});
