import { Meteor } from 'meteor/meteor';
import { Companies } from '../Companies';
import { Counts } from 'meteor/tmeasday:publish-counts';


Meteor.publish('companies', () => {
	return Companies.find();
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


	return Companies.find(query);
});


Meteor.publish('companiesCount', function() {
  	Counts.publish(this, 'number-of-companies', Companies.find({deleted: false}, ));
});