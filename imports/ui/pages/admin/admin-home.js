import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AdminHome from '../../components/admin/admin-home/admin-home-container'
import { StyleSheet, css } from 'aphrodite';


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

export const AdminHomePage = () => (
  	<div  className="row center-xs middle-xs" style={{padding: "100px 0px"}}>
		<div className="box">
	  		<h2>Admin Home</h2>
	  		<AdminHome />
		</div>
  	</div>
);
