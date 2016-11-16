import { composeWithTracker } from 'react-komposer';
import { NaicsCodes } from '../../../../api/NaicsCodes/NaicsCodes.js';
import { AdminHome } from './admin-home.js';
import { Loading } from '../../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  //const naicsCodesSub = Meteor.subscribe('naicsCodes');
  //if (naicsCodesSub.ready()) {
    //const codes = NaicsCodes.find().fetch();
    onData(null, {  });
  //}
};

export default composeWithTracker(composer, Loading)(AdminHome);
