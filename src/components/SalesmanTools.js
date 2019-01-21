import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

const SalesmanTools = (props) => {
  const login = props.login;
  return (
    <div>
      {
        login.status !== "Salesman"
        ? <Redirect to="/home"/>
        : <div style={{display:"flex", flexDirection:"column", alignItems:"flexStart"}}>
           <span>
            <Button size="large" component={Link} to="/showStatistics" variant="outlined" >Show Statistics</Button>
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

export default connect(mapStateToProps)(SalesmanTools);