import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';
import { NaicsCodes } from '../NaicsCodes/NaicsCodes';
import { Companies } from '../Companies/Companies';



// HELPERS
// ------------------------------------------

const cleanTitle = (title) => { // there are Ts added on to some of the NAICs titles in the csv, this will clean those Ts from the end of the strings before inserting
	let lastLetter = title.slice(-1); // grab last letter of title
	if (lastLetter === 'T') { // if last letter is a 't', then splice it and store new string as the newTitle. Then return new Title
		title = title.slice(0, -1);
	}
	return title
}


// METHODS
// ------------------------------------------

Meteor.methods({
	'utility.parseUpload': function(data){
		check( data, Array );

	    for ( let i = 0; i < data.length; i++ ) {
	      let item   = data[ i ],
	          exists = NaicsCodes.findOne( { naicsCode: item.code } );

	      if ( !exists ) {
	      	let cleanedTitle = cleanTitle(item.title.trim());
	      	let doc = {
	      		naicsCode: item.code,
	      		title: cleanedTitle,
	      		levelOne: item.code.length > 2 ? item.code.substring(0,3) : '',
	      		levelTwo: item.code.length > 4 ? item.code.substring(0,4) : '',
	      		//levelThree: item.code.length > 5 ? item.code.substring(0,5) : '',
	      		//levelFour: item.code.length > 5 ? item.code.substring(0,6) : '',
	      	}
	        NaicsCodes.insert( doc );
	      } else {
	        console.warn( 'Rejected. This item already exists.' );
	      }
	    }

	},
	'utility.deleteAllNaics': function(){
		let codes = NaicsCodes.find().fetch();
		codes.forEach(function(code){
			NaicsCodes.remove({_id: code._id});
		});
	},
	'utility.deleteAllComapnies': function(){
		let companies = Companies.find().fetch();
		companies.forEach(function(company){
			Companies.remove({_id: company._id});
		});
	},
	'utility.parseBusinesses': function(data){
		check( data, Array );

	    for ( let i = 0; i < data.length; i++ ) {
	      let item   = data[ i ],
	          exists = Companies.findOne( { title: item['Company Name'], address: item.Address } );

	      if ( !exists ) {
	      	let naicsArray = [];
	      	naicsArray.push(item['NAICS Code']);
	      	let doc = {
	      		revenue: item['Annual Revenue'],
	      		title: item['Company Name'],
	      		naicsCodes: naicsArray, 
	      		address: {
	      			address: item.Address,
	      			address2: item.Address,
	      			county: item.County,
	      			city: item.City,
	      			zip: item.Zip,
	      		},
	      		modelType: 'company',
	      		website: item['Company Website'],
	      		employeeCount: item.Employees
	      	}
	        Companies.insert( doc );
	        console.log( 'inserted' );
	      } else {
	        console.warn( 'Rejected. This item already exists.' );
	      }
	    }

	}
});





