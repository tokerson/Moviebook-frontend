import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import '../css/ToolsButtons.css';

const EditorTools = (props) => {
  const login = props.login;
  return (
    <div>
      {
        login.status !== "Administrator" && login.status !== "Editor"
        ? <Redirect to="/home"/>
        : <div className="buttonsWrapper">
            <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/addMovie" variant="outlined" >Add Movie</Button>
            <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/showIssues" variant="outlined" >Show Issues</Button>     
            <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/addArtist" variant="outlined" >Add Artist</Button>
            <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/addCinema" variant="outlined" >Add Cinema</Button>
            <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/addStation" variant="outlined" >Add TV Station</Button>
            <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/editArtist" variant="outlined" >Edit Artist</Button>
            <Button style={{marginBottom:"5px"}} className="toolsButton" size="large" component={Link} to="/editMovie" variant="outlined" >Edit Movie</Button>
            <Button style={{marginBottom:"5px"}} className="toolsButton" size="large" component={Link} to="/addShow" variant="outlined" >Add Show</Button>
            <Button style={{marginBottom:"5px"}} className="toolsButton" size="large" component={Link} to="/addTransmission" variant="outlined" >Add Transmission</Button>
            <Button style={{marginBottom:"5px"}} className="toolsButton" size="large" component={Link} to="/addPrize" variant="outlined" >Add Prize</Button>
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