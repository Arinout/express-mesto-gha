const cards = require('express').Router();

const {
  findAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validatePostCard, validateCardId } = require('../middlewares/validator');

cards.get('/', findAllCards);
cards.post('/', validatePostCard, createCard);
cards.delete('/:cardId', validateCardId, deleteCard);
cards.put('/:cardId/likes', validateCardId, likeCard);
cards.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cards;
