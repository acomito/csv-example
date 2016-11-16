import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AdminNavigation } from '../components/admin/admin-navigation/admin-navigation';

const composer = (props, onData) => {
  onData(null, { hasUser: Meteor.user() });
};

export default composeWithTracker(composer, {}, {}, { pure: false })(AdminNavigation);