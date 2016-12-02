import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../api/Companies/Companies.js';
import { NaicsCodes } from '../../../api/NaicsCodes/NaicsCodes.js';
import { JobsResults } from './jobs-results.js';
import { Loading } from '../loading.js';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


const composer = (props, onData) => {

	if (!Session.get('naicsSelections')) {
    	Session.set('naicsSelections', []);
    }
    
    
  const subscription = Meteor.subscribe('companyNaics', '', Session.get('naicsSelections'));
 // const naicsResultsSub = Meteor.subscribe('naicsResults', props.id);
 if (subscription.ready()) {

 	const companies = Companies.find().fetch();
 	if (!companies || !companies[0] || !companies[0].title) {
 		let jobs =[];
 		onData(null, { jobs });
 		return;
 	}
 	let companySearchTerm = companies[0].title;
 	console.log(companies[0].title);

 	Meteor.call('jobs.getJobs', companies, function(error, data){
  		if (error) { console.log(error); return; }
  		console.log(data.response.results.result);
    	let jobs = data.response.results.result;

    	if (!data || !data.response || !data.response.results || !data.response.results.result) {
    		let jobs = [];
    		onData(null, { jobs });
    		return;
    	}
    	
    	onData(null, { jobs });
  	});

 }
  	
    

};

export default composeWithTracker(composer, Loading)(JobsResults);
