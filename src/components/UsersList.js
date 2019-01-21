import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../css/App.css';
import '../css/Users.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Dialog, DialogTitle } from '@material-ui/core';



const URL = 'http://localhost:8080';


class UsersList extends Component {

    state = {
        users:[],
        userTypes:[],
        open: false
    }

    componentWillMount() {
        this.getUsers();
        this.getUserTypes();
    }

    getUserTypes = () => {
        axios.get(`${URL}/getAllUserTypes`).then( response => {
            this.setState({
                userTypes: response.data
            })
        })
    }

    changeUsersType = (event, login) => {
        axios.post(`${URL}/setUserType/${login}/${event.target.value}`)
        .then(response => {
            let users = this.state.users;
            for(let i = 0 ; i < users.length; i++) {
                if(users[i].login === login) {
                    users[i].userType = event.target.value;
                    this.setState({
                        users: users
                    });
                }
            }
        })
        .catch(err => console.log(err));
    }

    deleteUser = (login) => {
        axios.post(`${URL}/removeUser/${login}`)
             .then( response => {
                 if(response.data ==="Successful"){
                    this.getUsers();
                 }
                 else {
                    this.setState({
                        open:true
                    })
                 }
             })
    }

    onDialogClose = () => {
        this.setState({
            open:false
        })
    }

    showUsers = () => {
        return(
            <div className="usersWrapper">
                <Dialog open={this.state.open} onClose={this.onDialogClose}> 
                    <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
                {this.state.users.map( user => {
                    return <div key={user.login} className="userItem">
                    <div id="username">
                         <b>Username:</b> {user.login} 
                    </div >
                    <div id="usertype">
                        <FormControl className="usertypeSelect" margin="dense" style={{ minWidth: "80px", marginLeft: "5px", verticalAlign: "baseline" }}>
                            <InputLabel htmlFor="age-simple">User Type</InputLabel>
                            <Select value={user.userType} onChange={(e)=>this.changeUsersType(e,user.login)} label="Genre" id="genre" name="genre" >
                                {this.state.userTypes.map(type => (
                                    <MenuItem key={type} value={type} >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>   
                    </div>
                    <Button id="deleteButton" onClick={() => this.deleteUser(user.login)}variant="outlined" size="small">Delete user</Button>
                    </div>
                })}
            </div>
        );
    }

    getUsers = () => {
        axios.get(`${URL}/getAllUsers`).then( response => {
            this.setState({
                users: response.data
            })
        })
    }

    render(){
        const login = this.props.login;
        return(
        <div>
            {login.status !== "Administrator"
                ? <Redirect to="/home"/>
                : this.showUsers()
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

export default connect(mapStateToProps)(UsersList);