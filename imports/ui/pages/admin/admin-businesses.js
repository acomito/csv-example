import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AdminNaics from '../../components/admin/admin-naics/admin-naics-container'
import { StyleSheet, css } from 'aphrodite';
import { AdminBusinesses } from '../../components/admin/admin-businesses/admin-businesses'

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

export const AdminBusinessesPage = () => (
  	<div  className="row center-xs middle-xs" style={{padding: "100px 0px"}}>
  		<div className="box">
  	  		<AdminBusinesses />
  		</div>
  	</div>
);
