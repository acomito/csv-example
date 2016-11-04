import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';


export const Loading = () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress />
  </div>
);