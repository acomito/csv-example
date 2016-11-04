import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { returnActiveLink } from '../../modules/active-helpers';

const styles = {
  navLink: {
    color: "#ffffff"
  }
}

export const PublicNavigation = ({currentPath}) => (
	<div className="navLinks" >
      <Link to="/" >
        <FlatButton labelStyle={returnActiveLink(currentPath, '/')} style={styles.navLink} label="Home" />
      </Link>
    	<Link to="/signup" >
    		<FlatButton labelStyle={returnActiveLink(currentPath, '/signup')} style={styles.navLink} label="Signup" />
    	</Link>
    	<Link to="/login"  >
    		<FlatButton labelStyle={returnActiveLink(currentPath, '/login')}  style={styles.navLink} label="Login" />
    	</Link>
    </div>
);


PublicNavigation.propTypes = {
  currentPath: React.PropTypes.string,
};