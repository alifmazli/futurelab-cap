const Joi = require("joi");

const schema = Joi.object({
  task: Joi.string().min(5).max(50).required(),
  username: Joi.string().min(3).max(10).required()
});

module.exports = schema;
