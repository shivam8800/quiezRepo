"use strict";

const Joi = require("joi");
const { Model } = require("./helpers");

module.exports = class Quiez extends Model {
  static tableName = "quiez";

  static joiSchema = Joi.object({
    id: Joi.number().integer().greater(0),
    title: Joi.string().description("quiez title").required(true),
  });

  static get relationMappings() {
    const QuiezQuestion = require("./quiezQuestion");
    return {
      quiez: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuiezQuestion,
        join: {
          from: "quiez_question.quiez_id",
          to: "quiez.id",
        },
      },
    };
  }
};
