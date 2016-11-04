import { composeWithTracker } from 'react-komposer';
import { Companies } from '../../../api/Companies/Companies.js';
import { CompanySearchList } from './company-search-list.js';
import { Loading } from '../loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {

	if (!Session.get("searchValues_companies")){
	  	Session.set("searchValues_companies", '')
	  }
  let sessionValue = Session.get("searchValues_companies");
  let search = sessionValue.title;

  const subscription = Meteor.subscribe('companiesSearch', search);
  if (subscription.ready()) {
    let companies = Companies.find().fetch();
    onData(null, { companies });
  }
};

export default composeWithTracker(composer, Loading)(CompanySearchList);
