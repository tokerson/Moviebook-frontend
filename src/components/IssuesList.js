import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../css/App.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router'


const URL = 'http://localhost:8080';


class IssuesList extends Component {

    showIssues = () => {
        return(
            <h2>Issues</h2>
        );
    }

    render(){
        const login = this.props.login;
        return(
        <div>
            {login.status !== "Administrator" && login.status !== "Editor"
                ? <Redirect to="/home"/>
                : this.showIssues()
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

export default connect(mapStateToProps)(IssuesList);