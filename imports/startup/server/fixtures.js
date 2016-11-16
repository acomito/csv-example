import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import '../../api/utility-methods/seedDB.js'
import { Companies } from '../../api/Companies/Companies';
import faker from 'faker';


const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});

/*
const numberOfCompanies = Companies.find({},{limit: 1}).fetch();
      
      if (numberOfCompanies.length === 0) {

        Meteor.call('seedDB');

      }*/
