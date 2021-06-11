"use strict";

const Joi = require("joi");
const { Model } = require("./helpers");

module.exports = class Question extends Model {
  static tableName = "question";

  static joiSchema = Joi.object({
    id: Joi.number().integer().greater(0),
    title: Joi.string().description("question title").required(true),
    answer_id: Joi.number()
      .integer()
      .greater(0)
      .description("ref taken from option table"),
  });

  static get relationMappings() {
    const Option = require("./option");
    const QuiezQuestion = require("./quiezQuestion");
    return {
      question: {
        relation: Model.HasManyRelation,
        modelClass: Option,
        join: {
          from: "question.id",
          to: "option.question_id",
        },
      },
      answer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Option,
        join: {
          from: "question.answer_id",
          to: "option.id",
        },
      },
      quiez_question: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuiezQuestion,
        join: {
          from: "quiez_question.question_id",
          to: "question.id",
        },
      },
    };
  }
};
