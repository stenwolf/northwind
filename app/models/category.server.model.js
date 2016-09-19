'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
* Validate the length is greater than 15
*/
function validateLength(text){
	return text.length <= 15;
}

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'Please fill in the value for name',
		validate: [validateLength, 'name must be 15 characters or less']
	}
});

mongoose.model('Category', CategorySchema);