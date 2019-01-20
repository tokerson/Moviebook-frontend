import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../css/AddMovieForm.css';
import Axios from 'axios';
import { Dialog, DialogTitle } from '@material-ui/core';


const URL = 'http://localhost:8080';

class EditArtistForm extends Component {

    state={
        picture:'',
        open: false,
        success: false
    }

    componentWillMount() {
        // Axios.get(`${URL}/getArtist/${this.props.match.params.id}`)
    }

    handleSubmit= (event)=>{
        event.preventDefault();

        const data = new FormData(event.target);
        try {
        let url = encodeURIComponent(data.get('pictureUrl'));
        var changed = url.replace(/%/g, "_");
        } catch (err) {
            this.setState({
                success : false,
                open: true
            })
            return;
        }
        
        Axios.get(`${URL}/updateArtist/-1/${data.get('name')}/${data.get('surname')}/${data.get('origin')}/${data.get('date')}/${changed}`)
        .then(response => {
            let success = false;
            if( response.data === "Successful"){
                success = true;
            }
            this.setState({
                success: true,
                open: true
            })
        })
        .catch(err => this.setState({
            success : false,
            open: true
        }))
    }

    handlePictureChange = (event) => {
        this.setState({
            picture: event.target.value
        })
    }

    onDialogClose = () => {
        this.setState({
            open: false
        })
    }

    formRender = () => {
        return <div className="pictureWithForm">
            <Dialog open={this.state.open} onClose={this.onDialogClose}> 
            { this.state.success ? <DialogTitle>You successfuly added new artist</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
            <div className="pictureWrapper">
                <img className="picture" src={this.state.picture} alt=""></img>
            </div>
            <form onSubmit={this.handleSubmit} className="movieForm">
                <TextField type="text" id="name" name="name" label="Name" variant="outlined"  margin="dense"></TextField>
                <TextField type="text" id="surname" name="surname" label="Surname" variant="outlined"  margin="dense"></TextField>
                <TextField type="text" id="origin" name="origin" label="Origin" variant="outlined"  margin="dense"></TextField>
                <TextField type="date" id="date" name="date" label="Date of birth" InputLabelProps={{
                    shrink: true,
                }} variant="outlined" margin="dense"></TextField>
                <TextField type="text" id="pictureUrl" multiline={true} name="pictureUrl" label="URL of picture" variant="outlined" margin="dense" onChange={this.handlePictureChange}></TextField>
                <Button variant="outlined"type="submit" margin="dense">Add Artist</Button>
            </form>
        </div>
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
export default connect(mapStateToProps)(EditArtistForm);