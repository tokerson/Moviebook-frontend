import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickLogin, closeLogin, verifyData, logUser, failedLogin } from '../actions';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogTitle, DialogContent } from '@material-ui/core';


class LoginDialog extends Component {
    
    handleClickCloseLogin = () => {
        this.props.closeLogin();
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

    onSubmit = (values) => {
        console.log(values);
        const { reset } = this.props;

        this.props.verifyData(values).then( () => {
            if(this.props.login.status !== "") {
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

    render(){
        // handleSubmit is given by redux-form 
        return(
            <Dialog className="Form"
                    open={this.props.open ? true : false}
                    onClose={this.handleClickCloseLogin}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                    <DialogContent>

                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>    
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
                            <Button variant="outlined" size="small">Register</Button>
                        </form>
                    </DialogContent>
                /<Dialog
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

    return errors;
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ clickLogin, closeLogin, verifyData, logUser, failedLogin }, dispatch);
}

export default reduxForm({
    validate,
    form:'LoginForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
);