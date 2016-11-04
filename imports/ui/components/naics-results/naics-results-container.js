import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../api/Companies/Companies.js';
import { NaicsResults } from './naics-results.js';
import { Loading } from '../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('companies');
  if (subscription.ready()) {
    let company = Companies.findOne({_id: props.id});
    onData(null, { company });
  }
};

export default composeWithTracker(composer, Loading)(NaicsResults);
