//top-level
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
//material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
//material icons
import Feedback from 'material-ui/svg-icons/action/feedback';
import ThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down';
import TouchApp from 'material-ui/svg-icons/action/touch-app';
//custom components



const styles = {
  cardList: {
    margin: "0 auto",
    width: "100%",
    padding: "20px 10px"
  }
};


// EXPORTED COMPONENT
//-----------------------------------------------------------

class SearchBar extends React.Component {
 
 componentWillMount() {
    // when a user enters the search component, set the search value to an empty string
    Session.set("searchValues_companies", {title: ''})
 }
 componentWillUnmount() {
    // when a user leaves the search component, set the search value to an empty string
    Session.set("searchValues_companies", {title: ''})
 }
 render() { 

  const { watchGroups } = this.props;

  return <div>
    <Card className="text-left" style={styles.cardList}>
    <div className='row middle-xs center-xs'>
        <div className='box' style={{width: "90%"}} >
          <Search />
          <TextField
            name="search" 
            type="search" 
            style={{marginLeft: "5px", width: "90%"}} 
            onChange={(e)=>Session.set("searchValues_companies", {title: e.target.value})} 
          />
        </div>
    </div>
</Card>
</div>
 }
}

export const CompanySearch = () => (
  		<div  className="row middle-xs" style={{paddingTop: "50px"}} id="contest-list">
  			<div className="box" style={{width: "100%", margin: "0 auto", position: 'relative'}}>
          <SearchBar  />
  			</div>
  		</div>
);