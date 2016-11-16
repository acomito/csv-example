import { composeWithTracker } from 'react-komposer';
import { NaicsCodes } from '../../../../api/NaicsCodes/NaicsCodes.js';
import { AdminNaics } from './admin-naics.js';
import { Loading } from '../../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const naicsCodesSub = Meteor.subscribe('naicsCodes');
  if (naicsCodesSub.ready()) {
    const naicsCodes = NaicsCodes.find().fetch();
    onData(null, { naicsCodes });
  }
};

export default composeWithTracker(composer, Loading)(AdminNaics);
