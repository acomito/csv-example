import { Meteor } from 'meteor/meteor';
import { Companies } from '../Companies/Companies';
import faker from 'faker';




  


Meteor.methods({

	seedDB: function(){

	for (i = 0; i < 50; i++) { 

		 let company = {
				title: faker.company.companyName(),
				description: faker.lorem.sentence(),
				website: faker.internet.domainName(),
				modelType: 'company',
				revenue: 500000,
				employeeCount: 20,
				ownerId: faker.company.companyName(),
				address: faker.address.streetAddress()
		    }
		   
		    Companies.insert(company);
		    console.log('company inserted');
	}

		console.log('done seeding');
	},
});