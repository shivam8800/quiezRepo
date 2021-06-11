"use strict";
const Schmervice = require("@hapipal/schmervice");

module.exports = class QuestionService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  /**
   * Create questions and their options
   * @param {Object} payload {title: "some title", options: ["1","2","3","4"], answer: "2"}
   * @param {} txn
   */
  async create(payload, txn = null) {
    const { Question, Option } = this.server.models();
    const { title, options, answer } = payload;
    const question = await Question.query(txn).insert({ title });
    const question_id = question.id;
    await Option.bulkCreate(
      options.map((e) => {
        return { title: e, question_id };
      })
    );
    const getAnswer = await Option.findByTitle(answer);
    const answer_id = getAnswer[0].id;
    await this.update(question_id, { answer_id });
    return true;
  }

  async update(question_id, obj, txn = null) {
    const { Question } = this.server.models();
    return await Question.query(txn).update(question_id, obj);
  }

  /**
   *
   * @param {Number} question_numbers
   * @param {} txn
   * @returns {Object}
   */
  async getByNumber(question_numbers, txn = null) {
    const { Question } = this.server.models();
    return await Question.query(txn).limit(question_numbers);
  }
};
