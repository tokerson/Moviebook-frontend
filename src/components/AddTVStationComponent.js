import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../css/AddMovieForm.css';
import Axios from 'axios';
import { Dialog, DialogTitle } from '@material-ui/core';


const URL = 'http://localhost:8080';

class AddTVStationComponent extends Component {

    state={
        open: false,
        success: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        Axios.get(`${URL}/addStation/${data.get('name')}`)
        .then(response => {
            if( response.data === "Successful"){
                this.setState({
                    success: true,
                    open: true
                })
            }
        })
        .catch(err => this.setState({
            success : false,
            open: true
        }))
    }


    onDialogClose = () => {
        this.setState({
            open: false
        })
    }

    formRender = () => {
        return(
            <div>
                <Dialog open={this.state.open} onClose={this.onDialogClose}> 
                { this.state.success ? <DialogTitle>You successfuly added new station</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
               
                <form onSubmit={this.handleSubmit} className="movieForm" style={{margin:"auto"}}>
                    <TextField type="text" id="name" name="name" label="TV Station Name" variant="outlined"  margin="dense"></TextField>
                    
                    <Button variant="outlined"type="submit" margin="dense">Add TV Station</Button>
                </form>
            </div>
        );
    }

    render(){
        const login = this.props.login;
        return(
            <div>
                {login.status !== "Administrator" && login.status !== "Editor"
                ? <Redirect to="/home"/>
                : this.formRender()
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
export default connect(mapStateToProps)(AddTVStationComponent);