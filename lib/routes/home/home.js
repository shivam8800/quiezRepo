'use strict';

const Helpers = require('../helpers');

module.exports = Helpers.withDefaults({
	method: 'GET',
	path: '/',
	options: {
		handler: async (request, h) => {
			return { success: 'hello world' };
		}
	}
});
