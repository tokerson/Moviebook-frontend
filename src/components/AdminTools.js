import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const AdminTools = (props) => {
  const login = props.login;
  return (
    <div>
      {
        login.status !== "Administrator"
        ? <Redirect to="/home"/>
        : <div style={{display:"flex", flexDirection:"column", alignItems:"flexStart"}}>
          <span>
          <Button size="large" component={Link} to="/usersList" variant="outlined" >Modfiy users</Button>
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
export default connect(mapStateToProps)(AdminTools);