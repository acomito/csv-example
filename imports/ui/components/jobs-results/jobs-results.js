//top-level imports
import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import { Match } from 'meteor/check'
//modules




const NaicsItem = ({item}) => (
    <div className='col-xs-12 col-sm-6 col-md-4'>
      <div className='box'>
        <a target='_blank' href={item.url}>
          <Card className='row middle-xs center-xs' style={{marginTop: '10px', minHeight: '300px'}}>
            <div className='box' style={{width: '100%'}}>
              <h3>{item.jobtitle}</h3>
              <h5>{item.company ? item.company : ''}</h5>
              {item.city && Match.test(item.city, String) ? <h5>{item.city}</h5> : null}
             {/* <h3>{item.state ? item.state : ''}</h3>*/}
              {/*<h3>{item.state}</h3>*/}
            </div>
          </Card>
        </a>
      </div>
    </div>
);

const GeneralList = ({items}) => (
  	<div className='row'>
  		{items.length > 0 ? items.map(function(item){
  			return <NaicsItem key={item.jobkey} item={item} />
  		})
  		: null}
  	</div>
);

// EXPORTED COMPONENT
// ------------------------------------
export const JobsResults = ({jobs}) => (
  	<div className='row middle-xs center-xs'>
	  	<div className='box' style={{width: '80%', margin: '0 auto'}}>
	  		<h3>Jobs Found ({jobs.length})</h3>
	  		<GeneralList items={jobs} />
	  	</div>
  	</div>
);
