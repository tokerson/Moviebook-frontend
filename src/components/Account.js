import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dialog, DialogTitle } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { clickLogout } from '../actions';
import '../css/ToolsButtons.css';


const URL = 'http://localhost:8080';


class Account extends Component {

      state = {
        open: false,
        openGoodbye:false,
        redirect: false
      }

      deleteUser = () => {
        this.setState({
          open:false
        })
        axios.post(`${URL}/removeUser/${this.props.login.login_data.username}`)
        .then( response => {
            if(response.data ==="Successful"){
               this.setState({
                 openGoodbye:true,
               })
            }
        })
      }


      
      render(){
        const login = this.props.login;
        return (
          <div>
          { login.status !== ""  ? 
            <div className="buttonsWrapper">
              <Dialog open={this.state.open} onClose={()=> this.setState({open:false})} > 
                <DialogTitle>Are you sure you want to leave us ?</DialogTitle>
                <div style={{margin:"auto"}}>
                  <Button size="large" variant="outlined" onClick={this.deleteUser}><b>YES</b></Button>
                  <Button size="large" style={{background:"darkgrey",borderColor:"darkgrey"}}variant="outlined" onClick={()=>this.setState({open:false})}><b>NO</b></Button>
                </div>
              </Dialog>
              <Dialog open={this.state.openGoodbye} onClose={()=> {
                  this.setState({openGoodbye:false});
                  this.props.clickLogout();
                }} > 
                <DialogTitle>Thanks for being with us and feel <br></br>welcomed to come back any moment</DialogTitle>
              </Dialog>
                <Button style={{marginBottom:"5px"}} size="large" component={Link} to={"/watchList/".concat(login.login_data.username)}variant="outlined" >Show Watch List</Button>
                <Button style={{marginBottom:"5px"}} size="large" component={Link} to={"/changePassword/".concat(login.login_data.username)}variant="outlined" >Change Password</Button>
                <Button style={{marginBottom:"5px"}} size="large" variant="outlined" onClick={()=>this.setState({open:true})}><b>Delete account</b></Button>
            </div>
            : <Redirect to="/home"/> }
        </div>);
      }

}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clickLogout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);