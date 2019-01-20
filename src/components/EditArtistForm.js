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

    state = {
        surname: "",
        name: "",
        origin: "",
        birthDate: "",
        pictureUrl: "",
        types: [],
        prizes: [],
        films: [],
        open : false,
        success : false,
    }


    componentWillMount() {
        const id = this.props.match.params.id
        this.getArtist(id);
    }

    getArtist(id) {
        Axios.get(`${URL}/getArtist/${id}`)
        .then(response => {
            const surnameResult = response.data.surname;
            const nameResult = response.data.name;
            const originResult = response.data.origin;
            const birthDateResult = response.data.birthDate;
            const pictureUrlResult = response.data.pictureUrl;
            const typesResult = response.data.types;
            const prizesResult = response.data.prizes;
            const filmsResult = response.data.typeAndFilms;
            this.setState({
                surname: surnameResult,
                name: nameResult,
                origin: originResult,
                birthDate: birthDateResult,
                pictureUrl: pictureUrlResult,
                types: typesResult,
                prizes: prizesResult,
                films: filmsResult
            });
        })
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
        
        Axios.get(`${URL}/updateArtist/${this.props.match.params.id}/${data.get('name')}/${data.get('surname')}/${data.get('origin')}/${data.get('date')}/${changed}`)
        .then(response => {
            let success = false;
            if( response.data === "Successful"){
                success = true;
            }
            this.setState({
                success: success,
                open: true
            })
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

    handleChooseMovie = (movies) => {
        this.setState({
            movies : movies
        })
    }

    formRender = () => {
        return <div className="pictureWithForm">
            <Dialog open={this.state.open} onClose={this.onDialogClose}> 
            { this.state.success ? <DialogTitle>You successfuly edited this artist</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
            <div className="pictureWrapper">
                <img className="picture" src={this.state.pictureUrl} alt=""></img>
            </div>
            <form onSubmit={this.handleSubmit} className="movieForm">
                <TextField type="text" id="name" name="name" value={this.state.name} label="Name" variant="outlined" onChange={(event)=>{this.setState({name:event.target.value})}} margin="dense"></TextField>
                <TextField type="text" id="surname" name="surname" value={this.state.surname} label="Surname" variant="outlined" onChange={(event)=>{this.setState({surname:event.target.value})}} margin="dense"></TextField>
                <TextField type="text" id="origin" name="origin" value={this.state.origin}label="Origin" variant="outlined" onChange={(event)=>{this.setState({origin:event.target.value})}} margin="dense"></TextField>
                <TextField type="date" id="date" name="date" value={this.state.birthDate} label="Date of birth" InputLabelProps={{
                    shrink: true,
                }} variant="outlined" onChange={(event)=>{this.setState({birthDate:event.target.value})}} margin="dense"></TextField>
                <TextField type="text" id="pictureUrl" value={this.state.pictureUrl} multiline={true} name="pictureUrl" label="URL of picture" variant="outlined" onChange={(event)=>{this.setState({pictureUrl:event.target.value})}} margin="dense" ></TextField>
                <Button variant="outlined"type="submit" margin="dense">Edit Artist</Button>
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