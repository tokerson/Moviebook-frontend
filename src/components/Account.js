import React from 'react';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const URL = 'http://localhost:8080';


const Account = (props) => {

      const login = props.login;
      return (<div>
        { login.status !== "" ? 
          <div style={{display:"flex", flexDirection:"column", alignItems:"flexStart"}}>
            <span>
              <Button size="large" component={Link} to={"/watchList/".concat(login.login_data.username)}variant="outlined" >Show Watch List</Button>
            </span>
            <span>
              <Button size="large" component={Link} to={"/changePassword/".concat(login.login_data.username)}variant="outlined" >Change Password</Button>
            </span>
          </div>
          : <Redirect to="/home"/> }
      </div>);

}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps)(Account);