
//basic imports
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, browserHistory } from 'react-router';
//components
//import { PublicNavigation } from './public-navigation';
//import { AuthenticatedNavigation } from './authenticated-navigation';
import { SideNav } from '../../side-nav';
//material-ui stuff
import Menu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Person from 'material-ui/svg-icons/social/person';
import Settings from 'material-ui/svg-icons/action/settings';
//modules
import { returnActiveLink } from '../../../../modules/active-helpers';
import { appConfig } from '../../../../modules/config/app-config';
import { colorConfig } from '../../../../modules/config/color-config';


const { appName } = appConfig;
const { darkPrimary } = colorConfig;



const styles = {
  AppNavigation: {
    color: "#ffffff",
    backgroundColor: darkPrimary
  },
  titleLink: {
    textDecoration: "none",
    color: "#ffffff"
  },
  navLink: {
    color: "#ffffff"
  }
}





function UserNameDropDown(props) {
  
  const userName = () => {
      const user = Meteor.user();
      const name = user && user.profile ? user.profile.name : '';
      return user ? `${name.first} ${name.last}` : '';
    }

  return <FlatButton 
          label={userName()} 
          labelPosition="before" 
          style={styles.navLink}  
          icon={<ArrowDropDown />} 
          onTouchTap={props.handleTouchTap} 
          >
          </FlatButton>;
}

class AuthenticatedNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

handleLogout() {
  Meteor.logout(() => browserHistory.push('/login'));
}

  handleRequestClose(){
    this.setState({
      open: false,
    });
  }

  render() {
    const currentPath = this.props.currentPath;
    return <div className="navLinks" >
            <Link to="/admin/home">
              <FlatButton labelStyle={returnActiveLink(currentPath, '/admin/home')} style={styles.navLink} label="Home" />
            </Link>
            <Link to="/admin/naics">
              <FlatButton labelStyle={returnActiveLink(currentPath, '/admin/naics')} style={styles.navLink} label="Naics" />
            </Link>
            <Link to="/admin/businesses">
              <FlatButton labelStyle={returnActiveLink(currentPath, '/admin/businesses')} style={styles.navLink} label="Businesses" />
            </Link>

            
            <UserNameDropDown handleTouchTap={this.handleTouchTap} />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
              <Link to="/profile" >
                <MenuItem primaryText="Account"  leftIcon={<Person />} />
              </Link>
              <Divider />
                <MenuItem primaryText="Logout" onTouchTap={ this.handleLogout }  />
              </Menu>
            </Popover>
        </div>
  }
}

export class AdminNavigation extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose(){
    this.setState({open: false});
  } 


  render() {
    return <div>
              <AppBar 
                title={<Link to={Meteor.user() ? "/home" : "/"} style={styles.titleLink}>{appName}</Link>}
                style={styles.AppNavigation}
                iconElementRight={<AuthenticatedNavigation currentPath={this.props.currentPath} />}
                iconElementLeft={<IconButton onClick={this.handleToggle}><Menu className="mobileNav" color={"#FFFFFF"} /></IconButton>}
              />
              <SideNav isOpen={this.state.open} close={this.handleClose} hasUser={this.props.hasUser} currentPath={this.props.currentPath}/>
            </div>
  }
}


AdminNavigation.propTypes = {
  hasUser: React.PropTypes.object,
  currentPath: React.PropTypes.string
};