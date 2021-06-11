"use strict";
const Schmervice = require("@hapipal/schmervice");

module.exports = class OptionService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async findByTitle(title, txn = null) {
    const { Option } = this.server.models();
    return await Option.query(txn).where({ title });
  }

  async bulkCreate(payload, txn = null) {
    const { Option } = this.server.models();
    return await Option.query(txn).insert(payload);
  }
};
