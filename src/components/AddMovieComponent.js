import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router'
import sharedInstance from 'jss';

export const AddMovieComponent = (props) => {
    const login = props.login;
    return(
        <div>
            {login.status !== "Administrator" && login.status !== "Editor"
             ? <Redirect to="/home"/>
             : <h2>AddMovieComponent</h2>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
export default connect(mapStateToProps)(AddMovieComponent);