import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickLogin, closeLogin, verifyData, logUser, failedLogin, closeRegister, clickRegister, handleRegistration, failedRegistration } from '../actions';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


class LoginDialog extends Component {
    
    handleClickCloseLogin = () => {

        const { reset } = this.props;

        this.props.closeLogin();

        reset();
    }

    handleCloseRegister = () => {
        const { reset } = this.props;

        this.props.closeRegister();

        reset();
    }

    handleOpenRegister = () => {
        this.props.clickRegister();
    }

    renderInputField = (field) => {

        //field.meta.touched says if you tried to input antyhing so the error doesnt appear on start up
        return(
            <div className="form-input">
                <TextField label={field.label} type={field.type} {...field.input}/>
                <div className="error" >
                    {field.meta.touched ? field.meta.error: ''}
                </div>
            </div> 
        )
    }


    onLoginSubmit = (values) => {

        const { reset } = this.props;

        this.props.verifyData(values).then( () => {
            if(this.props.login.status && this.props.login.status !== "") {
                this.props.logUser(values.username);
            }
            else this.props.failedLogin();
        }).then(()=>{
            reset();
        });

    }

    logAgain = () => {
        this.props.clickLogin();
    }


    onRegisterSubmit = (values) => {

        const { reset } = this.props;

        this.props.handleRegistration(values).then( () => {
            if(this.props.login.success && this.props.login.success === 'Successful' ) {
                
            }
            else this.props.failedRegistration();
        }).then(()=> reset());
        //this.props.handleRegistration();
    }

    render(){
        // handleSubmit is given by redux-form 
        return(
            <Dialog className="Form"

                    open={this.props.open}

                    onClose={this.handleClickCloseLogin}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                    <DialogContent>

                        <form onSubmit={this.props.handleSubmit((event)=>this.onLoginSubmit(event))}>    
                            <Field
                                label="Username"
                                name="username"
                                type="text"
                                component={this.renderInputField}
                            />
                            <br /><br />
                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                component={this.renderInputField}
                            />
                            <br /><br /><br />
                            <Button variant="outlined" size="small" type="submit">Submit</Button>

                            <Button variant="outlined" size="small" onClick={this.handleOpenRegister}>Register</Button>
                        </form>

                        <Dialog
                            open={this.props.login.login_data.failed}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Nie udało się zalogować
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.logAgain}>
                                    Close
                            </Button>
                            </DialogActions>
                        </Dialog> 
                    </DialogContent>

                    {this.props.login.login_data.registering ?
                            <Dialog
                                open={this.props.login.login_data.registering}
                                onClose={this.handleCloseRegister}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                                <DialogContent>
                                    <form onSubmit={this.props.handleSubmit((event)=>this.onRegisterSubmit(event))}>
                                        <Field
                                            name="username"
                                            label="Username"
                                            type="text"
                                            component={this.renderInputField}
                                        />
                                        <br /><br />
                                        <Field
                                            name="password"
                                            label="Password"
                                            type="password"
                                            component={this.renderInputField}
                                        />
                                        <br /><br />
                                        <Field
                                            name="retyped_password"
                                            label="Retype Password"
                                            type="password"
                                            component={this.renderInputField}
                                        />
                                        <br /><br /><br />
                                        <Button variant="outlined" size="small" type="submit">Submit</Button>
                                        <Button variant="outlined" size="small" onClick={this.handleCloseRegister}>Close</Button>
                                    </form>
                                </DialogContent>

                                {this.props.login.success && this.props.login.success === 'Successful' ?
                                <Dialog
                                                    open={this.props.login.success === 'Successful' ? true : false}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">Success</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Zarejstrowano pomyślnie
                                    </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={this.handleCloseRegister}>
                                                            Close
                                    </Button>
                                                    </DialogActions>
                                                </Dialog> 
                                :null}

                            </Dialog> 
                        : null }
                
                                {this.props.login.login_data.failedRegistration ?
                                    <Dialog
                                        open={this.props.login.login_data.failed}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Nie udało się zarejestrować
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.logAgain}>
                                                Close
                                        </Button>
                                        </DialogActions>
                                    </Dialog> 
                                :null}
                            
  
            </Dialog>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if(!values.username) {
        errors.username = "Username is empty";
    }

    if(!values.password) {
        errors.password = "Password is empty";
    }

    if(!values.retyped_password) {
        errors.retyped_password = "Please retype password";
    }

    if( values.password !== values.retyped_password) {
        errors.retyped_password = "Password doesn't match";
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ clickLogin, closeLogin, verifyData, logUser, failedLogin, closeRegister, clickRegister, handleRegistration, failedRegistration }, dispatch);
}

export default reduxForm({
    validate,
    form:'LoginForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
);