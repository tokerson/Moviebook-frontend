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


const scaryAnimals = [
    { label: "Alligators", value: 1 },
    { label: "Crocodiles", value: 2 },
    { label: "Sharks", value: 3 },
    { label: "Small crocodiles", value: 4 },
    { label: "Smallest crocodiles", value: 5 },
    { label: "Snakes", value: 6 },
  ];

const URL = 'http://localhost:8080';

class AddShowComponent extends Component {

    state={
        open: false,
        success: false,
        date: new Date(),
        movie:"",
        cinemas:[],
        movieTitles:[],
        cinema:""
    }

    componentWillMount(){
        this.getMovies();
        this.getCinema();
    }

    getMovies = () => {
        Axios.get(`${URL}/allMovies`).then( response => {
            let movieTitles = response.data.map( movie => {
                return { label: movie.idMovie+". " + movie.title + " ( "+ movie.dateOfPremiere +" )", value: movie.idMovie}
            })
            this.setState({movieTitles : movieTitles})
        })
    }

    getCinema = () => {
        Axios.get(`${URL}/allCinemas`).then( response => {
            let cinemas = response.data.map( cinema => {
                return { label: cinema.idCinema+". " + cinema.name + " in "+ cinema.city, value: cinema.idCinema}
            })
            this.setState({cinemas : cinemas})
        })
    }

    handleSubmit = (event) => {
        if(this.state.movie !== "" && this.state.cinema !== "" && this.state.date !== null){
            Axios.post(`${URL}/addShow/${this.state.date.getTime()}/${this.state.cinema.value}/${this.state.movie.value}`)
            .then(response => {
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

    handleSelectCinema = (selectedOption) => {
        this.setState({
            cinema: selectedOption,
        })
    }


    onDialogClose = () => {
        this.setState({
            open: false
        })
    }

    formRender = () => {
        console.log(this.state.movie)
        console.log(this.state.cinema)
        console.log(this.state.date.getTime())
        return(
            <div>
                <Dialog open={this.state.open} onClose={this.onDialogClose}> 
                { this.state.success ? <DialogTitle>You successfuly added new show</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
               
                <form onSubmit={this.handleSubmit} className="movieForm" style={{margin:"auto"}}>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Select options={this.state.movieTitles} value={this.state.movie} onChange={this.handleSelectMovie}placeholder="Select movie" />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Select options={this.state.cinemas} value={this.state.cinema} onChange={this.handleSelectCinema}placeholder="Select cinema" />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <DateTimePicker disableClock={true} showNavigation={false} onChange={(date)=>this.setState({date})} value={this.state.date}/>
                    </div>
                    <Button variant="outlined"type="submit" margin="dense">Add Show</Button>
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
export default connect(mapStateToProps)(AddShowComponent);