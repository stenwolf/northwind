'use strict';

module.exports = function(app) {
	var categories = require('../controllers/categories.server.controller');
	app.route('/categories')
		.get(categories.list)
		.post(categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read)
		.put(categories.update)
		.delete(categories.delete);

	//when categoryId is presented in the URL, make this call to get the category and put it in the req			
	app.param('categoryId', categories.categoryByID);
};
