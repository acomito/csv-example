import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';
import { NaicsCodes } from '../NaicsCodes/NaicsCodes';
import { Companies } from '../Companies/Companies';
import 'meteor/mikowals:batch-insert'
import Baby from 'babyparse';
import { Match } from 'meteor/check'

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

	//MONGO_URL=mongodb://arcomito:arcomito@ds117988-a0.mlab.com:17988,ds117988-a1.mlab.com:17988/sales-local?replicaSet=rs-ds117988 
	'utility.parseBusinesses': function(data){
		check( data, Array );

		let docs = [];

	    for ( let i = 0; i < data.length; i++ ) {
	      	let item   = data[ i ];
/*	      	let companyNameLowerCase = item['Company Name'].toLowerCase();
	      	let cityNameToLowerCase = item.City.toLowerCase();*/
	       	let exists = Companies.find( { 'Company Name': item['Company Name'], 'City': item.City, 'State': item.State}, { limit: 1}).fetch();

      if ( exists.length === 0 ) {
      	let naicsArray = [];
      	naicsArray.push(item['NAICS Code']);
      	item.naicsCodes = naicsArray,
/*		      	let naicsArray = [];
	      	let revenue = !item['Annual Revenue'] ? 0 : Number(item['Annual Revenue']);
	      	naicsArray.push(item['NAICS Code']);
	      	let doc = {
	      		revenue: revenue,
	      		title: companyNameLowerCase,
	      		description: item.Desc.trim(),
	      		naicsCodes: naicsArray,
	      		industry: item.Industry.trim(),
	      		address: {
	      			address: item.Address,
	      			address2: item.Address2,
	      			county: item.County.trim(),
	      			city: cityNameToLowerCase,
	      			state: item.State,
	      			zip: item.Zip,
	      		},
	      		modelType: 'company',
	      		website: item['Company Website'],
	      		employeeCount: item.Employees
	      	}*/
	        Companies.insert( item, {}, function(error, response){
	        	let deci = i/data.length
	        	console.log(deci*100);
	    	});
       
	      } else {
	        console.warn( 'Rejected. This item already exists.' );
	      }
	    }

	    return;

	},
	   	'utility.serverParse': function(data){
		check( data, Array );

/*		console.log('it ran');
		let parsed = Baby.parseFiles(data);
		console.log(parsed);*/


	      	let item   = data[0];
	      	let companyName = item['Company Name'].trim();
	      	let companyNameLowerCase = companyName.toLowerCase();
	      	let cityName = item.City.trim();
	      	let cityNameToLowerCase = cityName.toLowerCase();
	       	let exists = Companies.find( { title: companyNameLowerCase, 'address.city': cityNameToLowerCase}, { limit: 1}).fetch();

	      if ( exists.length === 0 ) {
	      	let naicsArray = [];
	      	naicsArray.push(item['NAICS Code']);
	      	let doc = {
	      		revenue: item['Annual Revenue'],
	      		title: companyNameLowerCase,
	      		description: item.Desc.trim(),
	      		naicsCodes: naicsArray,
	      		industry: item.Industry.trim(),
	      		address: {
	      			address: item.Address,
	      			address2: item.Address2,
	      			county: item.County.trim(),
	      			city: cityNameToLowerCase,
	      			state: item.State,
	      			zip: item.Zip,
	      		},
	      		modelType: 'company',
	      		website: item['Company Website'],
	      	}
	        Companies.batchInsert( docs );
	        
	      } else {
	        console.warn( 'Rejected. This item already exists.' );
	      }

	    



	}
});





