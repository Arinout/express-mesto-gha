const Card = require('../models/card');
const NOT_FOUND_ERROR = require('../errors/not-found-error');
const BAD_REQUEST_ERROR = require('../errors/bad-request-error');
const FORBIDDEN_ERROR = require('../errors/forbidden-error');

const findAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BAD_REQUEST_ERROR('Переданны некоректные данные при создании карточки'),
        );
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Карточка с указанным id не найдена');
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new FORBIDDEN_ERROR('Необходимы права для удаления карточки');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BAD_REQUEST_ERROR('Передан несуществующий _id карточки.'),
        );
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Передан несуществующий id карточки');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BAD_REQUEST_ERROR('Переданы некорректные данные для постановки лайка'),
        );
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Передан несуществующий id карточки');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BAD_REQUEST_ERROR('Переданы некорректные данные для постановки лайка'),
        );
        return;
      }
      next(err);
    });
};
module.exports = {
  findAllCards, createCard, deleteCard, likeCard, dislikeCard,
};
