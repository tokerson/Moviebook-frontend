import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../css/App.css';
import '../css/Issues.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom';


const URL = 'http://localhost:8080';


class IssuesList extends Component {

    state = {
        issues:[]
    }

    componentWillMount() {
        this.getIssues();
    }

    resolveIssue = (id)=>{
        axios.post(`${URL}/removeIssue/${id}`).then( response =>{
            this.getIssues();
        }).catch(err => console.log(err));
    }

    showIssues = () => {
        return(
            <div >
                
                {this.state.issues.map( issue => {
                    return <div key={issue.idIssue} className="issueWrapper">
                    <NavLink to={{
                        pathname: '/editMovie/'.concat(issue.idMovie)
                        }}  style={{textDecoration:"none",color:"black"}}>
                        <div className="issueHeader">
                            <p>Movie: {issue.title}</p>
                            <p>Sent by: {issue.login}</p>
                            <Button onClick={(e)=> {
                                e.stopPropagation();
                                e.preventDefault();
                                this.resolveIssue(issue.idIssue);
                                }} onMouseDown={e => e.stopPropagation()} >Mark as resolved</Button>
                        </div>
                       
                        <div className="issueContent">
                            {issue.description} 
                        </div>
                    </NavLink>
                    </div>
                })}
            </div>
        );
    }

    getIssues = () => {
        axios.get(`${URL}/getAllIssues`).then( response => {
            this.setState({
                issues: response.data
            })
        })
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