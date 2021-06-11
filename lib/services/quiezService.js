"use strict";
const Boom = require("@hapi/boom");
const Schmervice = require("@hapipal/schmervice");
const QuestionService = require("./questionService");

module.exports = class QuiezService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  /**
   * create queizes
   * @param {Object} payload
   * @param {} txn
   * @returns
   */
  async create(payload, txn) {
    const { Quiez, Question, QuiezQuestion } = this.server.models();
    const { title, question_number } = payload;
    const promises = await Promise.all([
      Question.getByNumber(question_number),
      Quiez.query(txn).insert({ title }),
    ]);
    const questions = promises[0];
    const queiz = promises[1];
    const quiez_id = queiz.id;
    // TODO: need to create entries to queizQuestion table
    const quiez_questions = questions.map((question) => {
      return { question_id: question.id, quiez_id };
    });
    return await QuiezQuestion.query(txn).insert(quiez_questions);
  }
};
