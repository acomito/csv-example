//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//modules




// EXPORTED COMPONENT
// ------------------------------------
export const NaicsResults = ({company}) => (
  	<div className='row middle-xs center-xs'>
	  	<div className='box' style={{width: '100%'}}>
	  		<h2>results page for {company.title}</h2>
	  	</div>
  	</div>
);


