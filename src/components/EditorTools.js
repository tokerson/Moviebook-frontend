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
        : <div style={{display:"flex", flexDirection:"column", alignItems:"flexStart"}}>
           <span>
            <Button size="large" component={Link} to="/addMovie" variant="outlined" >Add Movie</Button>
           </span>
           <span>
            <Button size="large" component={Link} to="/showIssues" variant="outlined" >Show Issues</Button>
           </span> 
           <span>
            <Button size="large" component={Link} to="/addArtist" variant="outlined" >Add Artist</Button>
           </span> 
           <span>
            <Button size="large" component={Link} to="/addCinema" variant="outlined" >Add Cinema</Button>
           </span>
           <span>
            <Button size="large" component={Link} to="/addStation" variant="outlined" >Add TV Station</Button>
           </span>  
           <span>
            <Button size="large" component={Link} to="/editArtist" variant="outlined" >Edit Artist</Button>
           </span> 
           <span>
            <Button size="large" component={Link} to="/editMovie" variant="outlined" >Edit Movie</Button>
           </span> 
           <span>
            <Button size="large" component={Link} to="/addShow" variant="outlined" >Add Show</Button>
           </span> 
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