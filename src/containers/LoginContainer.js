import React , { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickLogin } from '../actions';

import Button from '@material-ui/core/Button';
// import { Dialog } from '@material-ui/core';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import { DialogTitle, DialogContent } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import LoginDialog from '../components/LoginDialog'


class LoginContainer extends Component {

    handleClick = ()=>{
        this.props.clickLogin();
    }


    render(){
        return(
            <div>
                <Button variant="outlined" size="small" onClick={this.handleClick}>Log in</Button>
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
    return bindActionCreators({ clickLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);