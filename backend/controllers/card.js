const Card = require('../models/card');

const InaccurateDataError = require('../errors/InaccurateDataError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

function getAllCards(req, res, next) {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send(card);
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные для добавления лайка'));
      } else {
        next(err);
      }
    });
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: userId,
        },
      },
      { new: true },
    )
    .then((card) => {
      if (card) return res.send(card);
      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные для снятия лайка'));
      } else {
        next(err);
      }
    });
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному id не найдена');
      }
      if (card.owner.valueOf() !== _id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      Card
        .findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Карточка успешно удалена' }))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  getAllCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
