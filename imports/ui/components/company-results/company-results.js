//top-level imports
import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
//modules


/*const toggleNaicsChoices = (naicsCodeId) => {

    let currentSelections = Session.get('naicsSelections');
    let newSelection = currentSelections.push(naicsCodeId)
    Session.set('naicsSelections', newSelection);
    console.log(Session.get('naicsSelections'));

}*/


const getColor = (naicsCode) => {
    let currentSelections = Session.get('naicsSelections');
    const isSelected = (element) => {
      console.log(element);
      console.log(element === naicsCode._id)
      return element === naicsCode._id;
    } 

    let codeExists = currentSelections.find(isSelected);

    if (codeExists) {
      return '#B2DFDB'
    }

    if (!codeExists) {
      return '#fff'
    }
    
}

class NaicsItem extends React.Component {
  constructor(props){
    super(props);
    this.toggleNaicsChoices = this.toggleNaicsChoices.bind(this);
  }
  toggleNaicsChoices() {

    let currentSelection = Session.get('naicsSelections')
    console.log(currentSelection);
    currentSelection.push(this.props.naicsCode._id)
    Session.set('naicsSelections', currentSelection);

  }

  render(){
      const {naicsCode} = this.props;
      return <div className='col-xs-12 col-sm-6 col-md-4'>
      <div className='box'>
        <Card className='row middle-xs center-xs' style={{minHeight: '150px', margin: '10px'}} onClick={this.toggleNaicsChoices}>
          <div className='box' style={{width: '100%'}}>
            <h5>{naicsCode.title}</h5>
          </div>
        </Card>
      </div>
    </div>

  }
}

/*const NaicsItem = ({naicsCode}) => (
    <div className='col-xs-12 col-sm-6 col-md-4'>
      <div className='box'>
        <Card className='row middle-xs center-xs' style={{minHeight: '150px', margin: '10px'}} onClick={()=> toggleNaicsChoices(naicsCode._id)}>
          <div className='box' style={{width: '100%'}}>
            <h5>{naicsCode.title}</h5>
          </div>
        </Card>
      </div>
    </div>
);*/

const styles = {
  labelStyle: {
    color: '#666',
    marginBottom: '0px',
    display: 'inline',
    marginRight: '4px'
  },
  valueStyle: {
    marginTop: '0px',
    display: 'inline'
  }
}

const CompanyCard = ({company, thisNaicsCode}) => (
    <Card className='row middle-xs center-xs' style={{minHeight: '350px', marginTop: '10px', padding: '10px'}} >
      <div className='box' style={{width: '100%'}}>
        <h1>{company.title}</h1>
        <Divider />
        <CardText>
            <h4 style={styles.labelStyle}>employee count:</h4>
            <p style={styles.valueStyle}>{company.employeeCount}</p>
            <br />
            <h4 style={styles.labelStyle}>industry:</h4>
            <p style={styles.valueStyle}>{thisNaicsCode && thisNaicsCode.title ? thisNaicsCode.title : ''}</p>
            <br />
            <h4 style={styles.labelStyle}>revenue:</h4>
            <p style={styles.valueStyle}>{company.revenue}</p>
            <br />
            <h4 style={styles.labelStyle}>website:</h4>
            <a target="_blank" href={'http://www.' + company.website}>{company.website}</a>
        </CardText>
      </div>
    </Card>
);

const NaicsList = ({naicsCodes}) => (
  	<div className='row'>
  		{naicsCodes.length > 0 ? naicsCodes.map(function(naicsCode){
  			return <NaicsItem naicsCode={naicsCode} />
  		})
  		: null}
  	</div>
);

// EXPORTED COMPONENT
// ------------------------------------
export class CompanyResults extends React.Component {
  constructor(props){
    super(props);
    this.clearSelections = this.clearSelections.bind(this);
  }
  componentWillUnMount(){
    if (!Session.get('naicsSelections')){ Session.set('naicsSelections', []); }   
  }
  componentWillMount(){
    if (!Session.get('naicsSelections')){ Session.set('naicsSelections', []); }
  }
  clearSelections(){
    Session.set('naicsSelections', []);
    Bert.alert('your naics selections were cleared!', 'success');
  }
  render(){
      const {company, naicsCodes, thisNaicsCode, selectedNaics} = this.props;
      return <div className='row middle-xs center-xs'>
      <div className='box' style={{width: '800px', margin: '0 auto'}}>
        <CompanyCard company={company} thisNaicsCode={thisNaicsCode} />
        {/*<Link to={'/naics/' + company.naicsCodes[0]}>*/}
        <Link to={'/jobs/'}>
          <RaisedButton label="Next" secondary={true} fullWidth={true} style={{marginTop: '15px'}} />
        </Link>
        {Session.get('naicsSelections').length > 0 && <h2 style={{color: '#666'}}>Current Selections:</h2>}
        {Session.get('naicsSelections').length > 0 && <FlatButton onClick={this.clearSelections}>clear selections</FlatButton>}
        <NaicsList naicsCodes={selectedNaics} />
        <h2>Select similar sectors to improve your search, then click next:</h2>
        <NaicsList naicsCodes={naicsCodes} />
      </div>
    </div>

  }
}

