import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import { Button } from '@material-ui/core';
import '../css/AddMovieForm.css';
import Axios from 'axios';
import { Dialog, DialogTitle } from '@material-ui/core';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';


const URL = 'http://localhost:8080';

class AddPrizeComponent extends Component {

    state={
        open: false,
        success: false,
        date: new Date(),
        movie:"",
        artists:[],
        movieTitles:[],
        artist:""
    }

    componentWillMount(){
        this.getMovies();
        this.getArtists();
    }

    getMovies = () => {
        Axios.get(`${URL}/allMovies`).then( response => {
            let movieTitles = response.data.map( movie => {
                return { label: movie.idMovie+". " + movie.title + " ( "+ movie.dateOfPremiere +" )", value: movie.idMovie}
            })
            this.setState({movieTitles : movieTitles})
        })
    }

    getArtists = () => {
        Axios.get(`${URL}/allArtists`).then( response => {
            let artists = response.data.map( artist => {
                return { label: artist.id +". " + artist.name + " "+ artist.surname, value: artist.id}
            })
            this.setState({artists: artists})
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);

        const movie = this.state.movie.value !== undefined ? this.state.movie.value : "null";
        const artist = this.state.artist.value !== undefined ? this.state.artist.value : "null";

            Axios.post(`${URL}/addPrize/${data.get('prizename')}/${data.get('whatfor')}/${data.get('date').substring(0,4)}/${artist}/${movie}`)
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

    handleSelectMovie = (selectedOption) => {
        this.setState({
            movie: selectedOption,
        })
    }

    handleSelectArtist = (selectedOption) => {
        this.setState({
            artist: selectedOption,
        })
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
                    { this.state.success ? <DialogTitle>You successfuly added new prize</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
               
                <form onSubmit={this.handleSubmit} className="movieForm" style={{margin:"auto"}}>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Select options={this.state.movieTitles} value={this.state.movie} onChange={this.handleSelectMovie}placeholder="Select movie" />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Select options={this.state.artists} value={this.state.artist} onChange={this.handleSelectArtist}placeholder="Select artist" />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <TextField variant="outlined" style={{width:"100%", height:"38px"}} type="text" id="whatfor" name="whatfor" placeholder="What is the prize for" ></TextField>
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <TextField variant="outlined" style={{width:"100%", height:"38px"}} type="text" id="prizename" name="prizename" placeholder="What is the name of the prize" ></TextField>
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <TextField type="date" id="date"  style={{width:"100%", height:"38px"}} name="date" label="Date of prize" InputLabelProps={{
                         shrink: true,
                        }} variant="outlined" margin="dense"></TextField>
                    </div>
                    <Button variant="outlined"type="submit"  margin="dense">Add Prize</Button>
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
export default connect(mapStateToProps)(AddPrizeComponent);