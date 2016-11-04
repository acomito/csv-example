//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//modules
import { appConfig } from '../../modules/config/app-config'
import { colorConfig } from '../../modules/config/color-config'

import CompanySearchList  from '../components/company-search/company-search-list-container';


// DESTRUCTURING
// ------------------------------------

const { appName, appDescription } = appConfig;

const {darkPrimary, primary1Color , primary2Color,  accent1Color, secondayText} = colorConfig;


// STYLES
// ------------------------------------
// STYLES
//----------------------------------------
const styles = StyleSheet.create({
    raisedButtons: {
		width: "300px",
		margin: "30px 10px 10px 10px"
	},
	//JUMBOTRON STYLES
	jumbotronStyles: {
		overflow: 'hidden', 
		margin: 0,
		width: '100%', 
		minHeight: '30vh', 
		display: 'block',
		color: '#fff', 
		background: primary1Color, 
		paddingTop: "40px",
		paddingBottom: "20px",
	},
	jumbotronHeader: {
		'@media (max-width: 667px)': {
            fontSize: '18px'
        }
	},
	jumbotronSubHeader: {
		marginBotom: '80px',
		'@media (max-width: 667px)': {
            fontSize: '25px'
        }
	},
	//
	hideOnMobile: {
		'@media (max-width: 667px)': {
            display: 'none'
        }
	},
	showOnMobile: {
		'@media (min-width: 667px)': {
            display: 'none'
        }
	},
});






// INTERNAL COMPONENTS
// ------------------------------------


const Jumbotron = ({props}) => (
  		<div className={css(styles.jumbotronStyles) + ' row middle-xs center-xs'}>
			<div className='box'>
	  			<h2 className={css(styles.jumbotronSubHeader)}>{appName}</h2>
	  			<h1 className={css(styles.jumbotronHeader)}>{appDescription}</h1>
	  			<div>
	  			</div>
	  		</div>
  		</div>
);



// EXPORTED COMPONENT
// ------------------------------------
export const Index = () => (
  	<div>
		<Jumbotron />
		<CompanySearchList />
  	</div>
);


