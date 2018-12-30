import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import { DialogTitle, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeLogin, verifyData } from '../actions';

class LoginDialog extends Component {
    
    handleClickCloseLogin = () => {
        this.props.closeLogin();
    }

    renderInputField = (field) => {
        const type = field.name === "password" ? "password" : "text";

        //field.meta.touched says if you tried to input antyhing so the error doesnt appear on start up
        return(
            <div className="form-input">
                <TextField label={field.label} type={type} {...field.input}/>
                <div className="error" >
                    {field.meta.touched ? field.meta.error: ''}
                </div>
            </div> 
        )
    }

    onSubmit = (values) => {
        this.props.verifyData(values);
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
                                component={this.renderInputField}
                            />
                            <br /><br />
                            <Field
                                label="Password"
                                name="password"
                                component={this.renderInputField}
                            />
                            <br /><br /><br />
                            <Button variant="outlined" size="small" type="submit">Submit</Button>
                            <Button variant="outlined" size="small">Register</Button>
                        </form>
                    </DialogContent>
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
        status: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ closeLogin, verifyData }, dispatch);
}

export default reduxForm({
    validate,
    form:'LoginForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
);