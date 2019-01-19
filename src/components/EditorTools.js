import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

const EditorTools = (props) => {
  const login = props.login;
  return (
    <div>
      {
        login.status !== "Administrator" && login.status !== "Editor"
        ? <Redirect to="/home"/>
        : <div>
           <Button size="large" component={Link} to="/addMovie" variant="outlined" >Add Movie</Button>
           <Button size="large" component={Link} to="/addArtist" variant="outlined" >Add Artist</Button>
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
export default connect(mapStateToProps)(EditorTools);