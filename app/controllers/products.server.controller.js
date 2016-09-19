'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Product = mongoose.model('Product'),
    errorHandler = require('./errors.server.controller');

/**
 * Create a Product
 */
exports.create = function(req, res) {
	var product = new Product(req.body);
	product.save(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});			
		}
		else{
			res.status(201).json(product);
		}
	});
};

/**
 * Show the current Product
 */
exports.read = function(req, res) {
	res.json(req.product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
	var product = req.product;
	product = _.extend(req.body);
	product.save(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else{
			res.status(200).json(product);
		}
	});

};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
	var product = req.product;
	product.remove(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else{
			res.status(200).json(product);
		}
	});
};

/**
 * List of Products
 */
exports.list = function(req, res) {
	Product.find().sort('category').exec(function(err, products){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else{
			res.status(200).json(products);
		}
	});
};

exports.productById = function(req, res, next, id){
	if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({
      message: 'Invalid ID'
    });
  }
  Product.findById(id).exec(function(err, product){
    if(err){
      return next(err);
    }
    if(!product){
      res.status(404).send({
        message: 'Product not found'
      });
    }
    req.product = product;
    next();
  });
};