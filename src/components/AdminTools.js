import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

const AdminTools = (props) => {
  const login = props.login;
  return (
    <div>
      {
        login.status !== "Administrator"
        ? <Redirect to="/home"/>
        : <div>
          <h1>Admin Tools</h1>
           {/* <Button size="large" component={Link} to="/addMovie" variant="outlined" >Add Movie</Button> */}
          </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      login: state.login
  }
}
export default connect(mapStateToProps)(AdminTools);