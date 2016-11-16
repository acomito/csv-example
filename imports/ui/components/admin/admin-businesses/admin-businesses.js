//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//modules
import { appConfig } from '../../../../modules/config/app-config'
import { colorConfig } from '../../../../modules/config/color-config'
//
import Papa from 'papaparse';
//
import { Loading } from '../../loading'


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




// EXPORTED COMPONENT
// ------------------------------------
export const AdminBusinesses = () => (
  	<div>
    <RaisedButton onClick={()=>Meteor.call('utility.deleteAllComapnies')} label="Delete all businesses"/>
  	</div>
);


