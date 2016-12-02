import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../../api/Companies/Companies.js';
import { AdminBusinesses } from './admin-businesses.js';
import { Loading } from '../../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {

    Meteor.call('Companies.getCount', 'lol', function(error, response){
    	if (error) { console.log(error); return; }
    	console.log(response)
    	let companiesCount = response;
    	onData(null, { companiesCount });
    });

};

export default composeWithTracker(composer, Loading)(AdminBusinesses);
