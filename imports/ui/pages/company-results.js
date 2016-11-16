//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//modules
import { appConfig } from '../../modules/config/app-config'
import CompanyResults from '../components/company-results/company-results-container'

// DESTRUCTURING
// ------------------------------------

const { appName, appDescription } = appConfig;


// STYLES
// ------------------------------------
const styles = StyleSheet.create({
	raisedButtons: {
		width: "300px",
		margin: "30px 10px 10px 10px"
	},
});




// EXPORTED COMPONENT
// ------------------------------------
export const CompanyResultsPage = (props) => (
  	<div>
		<CompanyResults id={props.params.id} /> 
  	</div>
);


