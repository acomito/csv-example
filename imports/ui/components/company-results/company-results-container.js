import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../api/Companies/Companies.js';
import { NaicsCodes } from '../../../api/NaicsCodes/NaicsCodes.js';
import { CompanyResults } from './company-results.js';
import { Loading } from '../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('company', props.id);
  const naicsResultsSub = Meteor.subscribe('naicsResults', props.id);

  if (!Session.get('naicsSelections')) {
    	Session.set('naicsSelections', []);
    }

  if (subscription.ready() && naicsResultsSub.ready()) {
    let company = Companies.findOne({_id: props.id});
    let naicsCodes = NaicsCodes.find({_id: {$nin: Session.get('naicsSelections') }}).fetch();
    let thisNaicsCode = NaicsCodes.findOne({naicsCode: company.naicsCodes[0]});

    
    let selectedNaics = NaicsCodes.find({_id: {$in: Session.get('naicsSelections') }}).fetch();

    onData(null, { company, naicsCodes, thisNaicsCode, selectedNaics });
  }
};

export default composeWithTracker(composer, Loading)(CompanyResults);
