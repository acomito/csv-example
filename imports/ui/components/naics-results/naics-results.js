//top-level imports
import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
//modules




const NaicsItem = ({item}) => (
    <div className='col-xs-12 col-sm-6 col-md-4'>
      <div className='box'>
        <Link to={'/company/' + item._id}>
          <Card className='row middle-xs center-xs' style={{marginTop: '10px', minHeight: '300px'}}>
            <div className='box' style={{width: '100%'}}>
              <h3>{item.title}</h3>
            </div>
          </Card>
        </Link>
      </div>
    </div>
);

const GeneralList = ({items}) => (
  	<div className='row'>
  		{items.length > 0 ? items.map(function(item){
  			return <NaicsItem key={item._id} item={item} />
  		})
  		: null}
  	</div>
);

// EXPORTED COMPONENT
// ------------------------------------
export const NaicsResults = ({companies}) => (
  	<div className='row middle-xs center-xs'>
	  	<div className='box' style={{width: '80%', margin: '0 auto'}}>
	  		<h3>Similar Companies ({companies.length})</h3>
	  		<GeneralList items={companies} />
	  	</div>
  	</div>
);


