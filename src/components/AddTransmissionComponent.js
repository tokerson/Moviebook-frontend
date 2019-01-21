import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../css/AddMovieForm.css';
import Axios from 'axios';
import { Dialog, DialogTitle } from '@material-ui/core';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';

const URL = 'http://localhost:8080';

class AddTransmissionComponent extends Component {

    state={
        open: false,
        success: false,
        date: new Date(),
        movie:"",
        stations:[],
        movieTitles:[],
        station:""
    }

    componentWillMount(){
        this.getMovies();
        this.getStations();
    }

    getMovies = () => {
        Axios.get(`${URL}/allMovies`).then( response => {
            let movieTitles = response.data.map( movie => {
                return { label: movie.idMovie+". " + movie.title + " ( "+ movie.dateOfPremiere +" )", value: movie.idMovie}
            })
            this.setState({movieTitles : movieTitles})
        })
    }

    getStations = () => {
        Axios.get(`${URL}/allStations`).then( response => {
            let stations = response.data.map( station => {
                return { label: station.name, value: station.name}
            })
            this.setState({stations: stations})
        })
    }

    handleSubmit = (event) => {
        if(this.state.movie !== "" && this.state.station !== "" && this.state.date !== null){
            Axios.post(`${URL}/addTvProgram/${this.state.station.value}/${this.state.date.getTime()}/${this.state.movie.value}`)
            .then(response => {
                console.log(response.data);
                let success = false;
                if( response.data === "Successful"){
                    success = true;
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
        
    }

    handleSelectMovie = (selectedOption) => {
        this.setState({
            movie: selectedOption,
        })
    }

    handleSelectStation = (selectedOption) => {
        this.setState({
            station: selectedOption,
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
                { this.state.success ? <DialogTitle>You successfuly added new transmission</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
               
                <form onSubmit={this.handleSubmit} className="movieForm" style={{margin:"auto"}}>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Select options={this.state.movieTitles} value={this.state.movie} onChange={this.handleSelectMovie}placeholder="Select movie" />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Select options={this.state.stations} value={this.state.station} onChange={this.handleSelectStation}placeholder="Select TV Station" />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <DateTimePicker disableClock={true} showNavigation={false} onChange={(date)=>this.setState({date})} value={this.state.date}/>
                    </div>
                    <Button variant="outlined"type="submit" margin="dense">Add Transmission</Button>
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
export default connect(mapStateToProps)(AddTransmissionComponent);