//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//modules
import { appConfig } from '../../modules/config/app-config'
import NaicsResults from '../components/naics-results/naics-results-container'

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
export const NaicsResultsPage = (props) => (
  	<div>
		<NaicsResults id={props.params.id} /> 
  	</div>
);


