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


// INTERNAL COMPONENT
// ------------------------------------

class CollectionUpload extends React.Component{
	constructor(props){
		super(props);
		this.handleUpload = this.handleUpload.bind(this);
		this.state = {
			loading: false
		}
	}
	handleUpload(event){
		this.setState({loading: true});
		const stopLoading = () => this.setState({loading: false})
		 Papa.parse( event.target.files[0], {
	      header: true,
	      complete( results, file ) {

	        Meteor.call( 'utility.parseUpload', results.data, ( error, response ) => {
	          if ( error ) { Bert.alert( error.reason, 'warning' ); stopLoading(); return }
	          stopLoading();
	          return;
	        });
	      }
	    });
	}
	render(){

		return <div>
					{!this.state.loading
					? <RaisedButton label="Naics Upload" labelPosition="before" className={css(styles.uploadButton)} >
			               <input type="file" name="image"  className={css(styles.imageInput)} onChange={this.handleUpload} />
			          </RaisedButton>
			        : <Loading />
			    	}
			  	</div>
	}
}

class BusinessesUpload extends React.Component{
	constructor(props){
		super(props);
		this.handleUpload = this.handleUpload.bind(this);
		this.state = {
			loading: false
		}
	}
	handleUpload(event){
		this.setState({loading: true});
		const stopLoading = () => this.setState({loading: false});
		 Papa.parse( event.target.files[0], {
		 	header: true,
			chunk: function(results, parser) {
				console.log("Chunk:", results.data);
				parser.pause();
				const resumeParsing = () => parser.resume();
				 Meteor.call( 'utility.parseBusinesses', results.data, function(error, response){
				 	if (error) { parser.abort(); Bert.alert(error.reason, 'danger'); return; }
				 	Bert.alert('chunk done!', 'success');
				 	resumeParsing();
				 });
			},
	      complete( results, file ) {
	      	console.log('done!')
/*	        Meteor.call( 'utility.parseBusinesses', results.data, ( error, response ) => {
	          if ( error ) {
	            Bert.alert( error.reason, 'warning' );
	            stopLoading();
	          } else {
	          	Bert.alert( 'done!', 'success' );
	          	stopLoading();
	            // Handle success here.
	          }
	        });*/
	      }
	    });
	}
/*	handleUpload(event){
		this.setState({loading: true});
		const stopLoading = () => this.setState({loading: false});

	        Meteor.call( 'utility.serverParse', event.target.files[0], ( error, response ) => {
	          if ( error ) {
	            Bert.alert( error.reason, 'warning' );
	            stopLoading();
	          } else {
	          	Bert.alert( 'done!', 'success' );
	          	stopLoading();
	            // Handle success here.
	          }
	        });
	}*/
	render(){

		return <div>
					{!this.state.loading
					? <RaisedButton label="Upload Businesses" labelPosition="before" className={css(styles.uploadButton)} >
			               <input type="file" name="image"  className={css(styles.imageInput)} onChange={this.handleUpload} />
			          </RaisedButton> : <Loading />}
			  	</div>
	}
}



// EXPORTED COMPONENT
// ------------------------------------
export const AdminHome = () => (
  	<div>
		<CollectionUpload />
		<BusinessesUpload />
  	</div>
);


