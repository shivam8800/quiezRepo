"use strict";

const Joi = require("joi");
const { Model } = require("./helpers");

module.exports = class QuiezQuestion extends Model {
  static tableName = "quiez_question";

  static joiSchema = Joi.object({
    id: Joi.number().integer().greater(0),
    question_id: Joi.number()
      .integer()
      .greater(0)
      .required()
      .description("ref taken from question table"),
    quiez_id: Joi.number()
      .integer()
      .greater(0)
      .required()
      .description("ref taken from quiez table"),
  });

  static get relationMappings() {
    const Quiez = require("./quiez");
    const Question = require("./question");
    return {
      quiez: {
        relation: Model.HasManyRelation,
        modelClass: Quiez,
        join: {
          from: "quiez.id",
          to: "quiez_question.quiez_id",
        },
      },
      quiez_question: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "question.id",
          to: "quiez_question.question_id",
        },
      },
    };
  }
};
