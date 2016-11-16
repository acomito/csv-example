import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../api/Companies/Companies.js';
import { NaicsCodes } from '../../../api/NaicsCodes/NaicsCodes.js';
import { NaicsResults } from './naics-results.js';
import { Loading } from '../loading.js';
import { Meteor } from 'meteor/meteor';



const composer = (props, onData) => {

	if (!Session.get('naicsSelections')) {
    	Session.set('naicsSelections', []);
    }
    

    
  const subscription = Meteor.subscribe('companyNaics', props.id, Session.get('naicsSelections'));
  //const naicsResultsSub = Meteor.subscribe('naicsResults', props.id);
  if (subscription.ready()) {
    let companies = Companies.find().fetch();
    onData(null, { companies });
  }
};

export default composeWithTracker(composer, Loading)(NaicsResults);
