'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Category = mongoose.model('Category');

/**
 * Unit tests
 */
describe('Category Model', function() {

	describe('Saving', function() {
		it('saves new record', function(done) {
			var category = new Category({
				name: 'planets',
				description: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune'
			});

			category.save(function(err, saved){
				should.not.exist(err, saved);
				console.log('Saved value after success: ' + saved);
				done();
			});


		});

		it('throws validation error when name is empty', function(done){
			var category = new Category({
				description: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune'
			});

			category.save(function(err){
				should.exist(err);
				err.errors.name.message.should.equal('Please fill in the value for name');
				done();
			});

			
		});

		it('throws validation error when name longer than 15 chars', function(done){
			var category = new Category({
				name: 'Planets in the Solar system',
				description: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune'
			});

			category.save(function(err){
				should.exist(err);
				err.errors.name.message.should.equal('name must be 15 characters or less');
				done();
			});
		});
		
		it('throws validation error for duplicate category name', function(done){
			var category = new Category({
				name: 'planets',
				description: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune'
			});
			category.save(function(err, saved){
				should.not.exist(err);
				var duplicate = new Category({
					name: 'planets',
					description: 'duplicate category name'
				});
				duplicate.save(function(err){
					should.exist(err);
					//make sure the error message contains duplicate key error
					err.err.indexOf('duplicate key error').should.not.equal(-1);
					done();
				});				
			});
		});
	});

	afterEach(function(done){
		Category.remove().exec();
		done();
	});

});