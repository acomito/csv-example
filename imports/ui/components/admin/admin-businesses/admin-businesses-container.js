import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../../api/Companies/Companies.js';
import { AdminBusinesses } from './admin-businesses.js';
import { Loading } from '../../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const naicsCodesSub = Meteor.subscribe('companies');
  if (naicsCodesSub.ready()) {
    const companiesCount = Companies.find().count();
    onData(null, { companiesCount });
  }
};

export default composeWithTracker(composer, Loading)(AdminBusinesses);
