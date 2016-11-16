//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';
//modules
import { appConfig } from '../../../../modules/config/app-config'
import { colorConfig } from '../../../../modules/config/color-config'
//
import Papa from 'papaparse';

// DESTRUCTURING
// ------------------------------------

const { appName, appDescription } = appConfig;

const {
	darkPrimary, 
	primary1Color, 
	primary2Color,  
	accent1Color, 
	secondayText
} = colorConfig;



// STYLES
//----------------------------------------
const styles = StyleSheet.create({
    uploadButton: {
      margin: 12,
      display: "block",
      width: "160px",
      margin: "15px auto",
    },
    imageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    },
});


const NaicsItem = ({code}) => (
	<div className='col-xs-4'>
		<div className='box' style={{width: '100%'}}>
			<Card style={{minHeight: '200px', marginBottom: '15px'}}>
				<CardTitle title={code.title} />
			</Card>
		</div>
	</div>
);


// EXPORTED COMPONENT
// ------------------------------------
export const AdminNaics = ({naicsCodes}) => (
  	<div style={{width: '900px', margin: '0 auto'}}>
  	<RaisedButton label={'Delete All Naics'} onClick={()=> Meteor.call('utility.deleteAllNaics')} />
	  	<div className='row middle-xs center-xs'>
	  	{naicsCodes.length > 0 ? naicsCodes.map(function(code){
	  		return <NaicsItem key={code._id} code={code} />
	  	})
	  	: <div>no naics codes</div>}
	  	</div>
  	</div>
);


