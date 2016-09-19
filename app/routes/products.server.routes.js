'use strict';

module.exports = function(app) {
	// Routing logic   
	var products = require('../controllers/products.server.controller.js');
  app.route('products')
    .get(products.list)
    .post(products.create);

  app.route('products/:productId')
    .get(products.read)
    .put(products.update)
    .delete(products.delete);


    app.param('productId', products.productById);
};