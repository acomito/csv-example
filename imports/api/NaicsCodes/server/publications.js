import { Meteor } from 'meteor/meteor';
import { NaicsCodes } from '../NaicsCodes';
import { Companies } from '../../Companies/Companies';
import { Counts } from 'meteor/tmeasday:publish-counts';


Meteor.publish('naicsCodes', () => {
	return NaicsCodes.find();
});


Meteor.publish('naicsResults', (companyId) => {
	check(companyId, String);

	let company = Companies.findOne({_id: companyId});

	let queryOne = {naicsCode: {$in: company.naicsCodes }};

	let query = {$or: [queryOne]};

	if (company.naicsCodes[0].length > 4) {
		let levelOneCode = company.naicsCodes[0].substring(0,3)
		let queryTwo = {levelOne: levelOneCode };
		query = {$or: [queryOne, queryTwo]};
	}

	return NaicsCodes.find(query);
});


