import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Pvt = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div>
      <Route
        {...rest}
        render={(props) => (
          accessToken !== null ? <Component {...props} /> : <Redirect to="/" />
        )}
      />
    </div>
  );
};

export default Pvt;
