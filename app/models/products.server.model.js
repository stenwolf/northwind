'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 40;
}	

/**
 * Products Schema
 */
var ProductsSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: 'invalid category'
	},
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill in the value for name',
		validate: [validateLength, 'name must be 40 characters or less']
	},
	quantityPerUnit: {
		type: String
	},
	unitPrice: {
		type: Number,
		default: 0
	},
	unitsInStock: {
		type: Number,
		default: 0,
		min: 0
	},
	unitsOnOrder: {
		type: Number,
		default: 0,
		min: 0
	},
	discontinued: {
		type: Boolean,
		default:false
	}

});

mongoose.model('Product', ProductsSchema);