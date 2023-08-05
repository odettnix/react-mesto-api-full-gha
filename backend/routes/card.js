const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const InaccurateDataError = require('../errors/InaccurateDataError');
const {
  getAllCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/card');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new InaccurateDataError('Неправильный URL');
      }
      return value;
    }),
  }),
}), createCard);

router.get('/', getAllCards);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

module.exports = router;
