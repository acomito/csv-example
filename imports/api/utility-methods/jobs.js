import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import parser from 'xml2json';


Meteor.methods({
	'jobs.getJobs': function(companies){
		check(companies, Array);
		let convertHTTPToSync  = Meteor.wrapAsync( HTTP.call );

		let options = { 
			params: {
				publisher: '4745352910248302',
				as_cmp: 'forbes',
				v: '2',
				format: 'xml',
			}
		};
		let mappedCompanies = companies.map(function(company){
			let title = company.title;
			let cleanedCommaTitle = title.replace(/\,/g, '');
			let cleanedIncTitle = cleanedCommaTitle.replace('Inc.', '');
			let quotedTitle = `%22${cleanedIncTitle}%22`;
			return quotedTitle;
		});
		console.log(mappedCompanies)
		let mappedCompaniesToString = mappedCompanies.toString();
		//let cleanedSpacesCompanies = mappedCompaniesToString.replace(/\s/g, '%20');
		let cleaned1 = mappedCompaniesToString.replace(/\&/g, '%26');
		let cleaned2 = cleaned1.replace(/\'/g, '%27');
		let cleanedSpacesCompanies = cleaned2.replace(/\s/g, '+');
		let cleanedCommasCompanies = cleanedSpacesCompanies.replace(/\,/g, '+or+');
		let cleanedPeriodsCompanies = cleanedCommasCompanies.replace(/\./g, '%2E')
		

		console.log(cleanedPeriodsCompanies);

		//company:${company}%20
		//http://stackoverflow.com/questions/37592883/indeed-api-search-for-particular-company
		let radius = `radius=`;
		let sort = `sort=`;
		let limit = `limit=1000`;
		let start = `start=0`;
		let location = `l=${''}`;
		//let query = `q=company:${company}%20title:sales`;
		let query = `q=company:%28${cleanedPeriodsCompanies}%29`;
		let version = `v=${'2'}`;
		let publisher = `publisher=${'4745352910248302'}`;
		let url = `http://api.indeed.com/ads/apisearch?${publisher}&${start}&${limit}&${location}&${radius}&${sort}&${version}&${query}`;
		console.log(url);
		let jsonResponse;

		try{
			//http://api.indeed.com/ads/apisearch?publisher=4745352910248302&as_and=&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=forbes&jt=all&st=&salary=&radius=25&l=&fromage=any&limit=10&sort=&psf=advsrch
		  resultOfCreateItem = convertHTTPToSync( "GET", url);	
		  	//console.dir(resultOfCreateItem);
		  	let options = {
			    object: true,
			    reversible: false,
			    coerce: false,
			    sanitize: true,
			    trim: true,
			    arrayNotation: false
			};
		  	jsonResponse = parser.toJson(resultOfCreateItem.content, options);
		  	console.dir(jsonResponse);
			
		  
		}
		catch(error){
			console.log('there was an error' + error);
		  	throw new Meteor.Error( 500, error );
		}

		return jsonResponse
	}
});