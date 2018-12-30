import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeLogin, updateUsername, updatePassword } from '../actions';

class LoginDialog extends Component {
    
    handleClickCloseLogin = () => {
        this.props.closeLogin();
    }

    handleUsernameChange = (event) => {
        this.props.updateUsername(event);
    }

    handlePasswordChange = (event) => {
        this.props.updatePassword(event);
    }

    submitLogin = () => {
        
    }

    render(){
        return(
            <Dialog
                    open={this.props.open ? true : false}
                    onClose={this.handleClickCloseLogin}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                    <DialogContent>

                        <TextField
                            id="standard-name"
                            label="Username"
                            onChange={this.handleUsernameChange}
                            value={this.props.login.login_data.username}
                        />
                        <br /><br />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            onChange={this.handlePasswordChange}
                            value={this.props.login.login_data.password}
                        />
                        <br /><br /><br />
                        <Button variant="outlined" size="small" onClick={this.submitLogin}>Submit</Button>
                        <Button variant="outlined" size="small">Register</Button>

                    </DialogContent>
            </Dialog>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ closeLogin, updateUsername, updatePassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);