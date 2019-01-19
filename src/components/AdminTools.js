import React from 'react';
import Button from '@material-ui/core/Button';
import AddMovieComponent from './AddMovieComponent'
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

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