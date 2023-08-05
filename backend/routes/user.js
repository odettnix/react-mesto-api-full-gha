const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const InaccurateDataError = require('../errors/InaccurateDataError');

const {
  getCurrentUserInfo,
  loginUser,
  createUser,
  getAllUsers,
  getUserInfo,
  setUserInfo,
  setUserAvatar,
} = require('../controllers/user');

router.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new InaccurateDataError('Неправильный URL');
      }
      return value;
    }),
  }),
}), createUser);

router.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);

router.get('/', getAllUsers);
router.get('/me', getCurrentUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), setUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new InaccurateDataError('Неправильный URL');
      }
      return value;
    }),
  }),
}), setUserAvatar);

module.exports = router;
