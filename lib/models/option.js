"use strict";

const Joi = require("joi");
const { Model } = require("./helpers");

module.exports = class Option extends Model {
  static tableName = "option";

  static joiSchema = Joi.object({
    id: Joi.number().integer().greater(0),
    title: Joi.string().description("option title").required(true),
    question_id: Joi.number()
      .integer()
      .greater(0)
      .required()
      .description("ref taken from question table"),
  });

  static get relationMappings() {
    const Question = require("./question");
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "option.question_id",
          to: "question.id",
        },
      },
      answer: {
        relation: Model.HasOneRelation,
        modelClass: Question,
        join: {
          from: "option.id",
          to: "question.answer_id",
        },
      },
    };
  }
};
