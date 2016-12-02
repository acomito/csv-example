import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';
import { Companies } from './Companies'

Meteor.methods({
	'Companies.getCount': function(string){
		check(string, String);

		let count =  Companies.find().count();
		return count
	}
})