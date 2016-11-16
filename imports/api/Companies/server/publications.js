import { Meteor } from 'meteor/meteor';
import { Companies } from '../Companies';
import { NaicsCodes } from '../../NaicsCodes/NaicsCodes';
import { Counts } from 'meteor/tmeasday:publish-counts';


Meteor.publish('companies', () => {
	return Companies.find({},{limit: 50});
});

Meteor.publish('company', (companyId) => {
	check(companyId, String)
	return Companies.find({_id: companyId},{limit: 1});
});

Meteor.publish('companyNaics', (naicsCode, naicsCodeArray) => {
	check(naicsCode, String);
	//check( naicsCodeArray, Match.OneOf( Array, null, undefined ) );
	check( naicsCodeArray, Array);


	console.log(naicsCodeArray)
	let naicsCodeQuery =  NaicsCodes.find({_id: {$in: naicsCodeArray} }).fetch();
	console.log(naicsCodeQuery.length)
	let naicsCodes = naicsCodeQuery.map(function(naic){
		return naic.naicsCode;
	});
	naicsCodes.push(naicsCode);
	let query = {naicsCodes: {$in: naicsCodes} };
	console.log(query)
	//naicsCodeArray.push(naicsCode);

	return Companies.find(query, {limit: 100});
});


Meteor.publish('companiesSearch', (search) => {
	check( search, Match.OneOf( String, null, undefined ) );

	let query = {
		 	deleted: false,
	 	};

	 	if ( search ) {
		    let regex = new RegExp( search, 'i' );

		    query = {
		      deleted: false,
		      $or: [
		        { title: regex },
		      ]
		    };
		    //return Contests.find(searchQuery, projection);
		  }


	return Companies.find(query, {limit: 150});
});


Meteor.publish('companiesCount', function() {
  	Counts.publish(this, 'number-of-companies', Companies.find({deleted: false}, ));
});