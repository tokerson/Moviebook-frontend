import React , { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickLogin, clickLogout } from '../actions';

import Button from '@material-ui/core/Button';
// import { Dialog } from '@material-ui/core';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import { DialogTitle, DialogContent } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import LoginDialog from '../components/LoginDialog'


class LoginContainer extends Component {

    handleLoginClick = ()=>{
        this.props.clickLogin();
    }

    handleLogoutClick = ()=>{
        console.log("click")
        this.props.clickLogout();
    }

    render(){
        return(
            <div>
                {this.props.login.login_data && this.props.login.login_data.logged
                    ? 
                    <div style={{display:'flex'}}><h4 style={{marginRight:'10px'}}>{this.props.login.login_data.username}</h4>
                      <Button style={{ height:'100%', margin:'auto'}} variant="outlined" size="small" onClick={this.handleLogoutClick}>Log out</Button>
                    </div>
                    : <Button variant="outlined" size="small" onClick={this.handleLoginClick}>Log in</Button>
                    
                }
                { this.props.login.login_data ?
                 <LoginDialog open={this.props.login.login_data.logging}/> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ clickLogin, clickLogout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);