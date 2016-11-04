//top-level imports
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
//modules
//import { appConfig } from '../../modules/config/app-config'
import {CompanySearch} from './search-bar'


// DESTRUCTURING
// ------------------------------------

///const { appName, appDescription } = appConfig;


// STYLES
// ------------------------------------
const styles = StyleSheet.create({
	raisedButtons: {
		width: "300px",
		margin: "30px 10px 10px 10px"
	},
});


const CompanyCard = ({ company }) => (
	<div className='col-xs-12 col-sm-6 col-md-4'>
		<div className='box'>
			<Link to={'/naics/' + company._id}>
				<Card style={{marginBottom: '20px', marginTop: '20px', minHeight: 300}}>
					<CardTitle title={company.title} />
					<CardText style={{textAlign: 'left'}}>
						<h6 style={{marginBottom: '5px', color: '#666'}}>description:</h6>
						{company.description}
						<h6 style={{marginBottom: '5px', color: '#666'}}>address:</h6>
						{company.address}
					</CardText>
				</Card>
			</Link>
		</div>
	</div>
);

const CompanyList = ({ companies }) => (
	<div className='row middle-xs center-xs'>
		{companies && companies.length > 0 
		? companies.map(function(company){
			return <CompanyCard key={company._id} company={company} />
		})
		: null}
	</div>
);

// EXPORTED COMPONENT
// ------------------------------------
export const CompanySearchList = ({ companies }) => (
  	<div className='row middle-xs center-xs' style={{width: '80%', margin: '0 auto'}}>
	  	<div className='box' style={{width: '100%'}}>
	  		<CompanySearch />
	  		<CompanyList companies={companies} />
	  	</div>	
  	</div>
);



