import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../css/ToolsButtons.css';


const AdminTools = (props) => {
  const login = props.login;
  return (
    <div>
      {
        login.status !== "Administrator"
        ? <Redirect to="/home"/>
        : <div className="buttonsWrapper">
          <Button style={{marginBottom:"5px"}} size="large" component={Link} to="/usersList" variant="outlined" >Modfiy users</Button> 
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