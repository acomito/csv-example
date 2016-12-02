import React from 'react';
import AppNavigation from '../containers/app-navigation';
import { browserHistory } from 'react-router';
import AdminNavigation from '../containers/admin-navigation';



export const Admin = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  componentWillMount(){
    Tracker.autorun(() => {
      if (!Meteor.userId()) { browserHistory.push('/'); }
      return;
    });
  },
  render() {


    return <div>
            <AdminNavigation path={location.pathname} currentPath={this.props.location.pathname}  />
              { this.props.children }
          </div>;
  }
  
});
