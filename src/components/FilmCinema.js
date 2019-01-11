import React , { Component } from 'react';
import Axios from 'axios';
import FilmCinemaItem from './FilmCinemaItem';

const URL = 'http://localhost:8080';

class FilmCinema extends Component {

    state = {
        shows: [],
        cinema: undefined
    }


    componentWillMount() {
        const id = this.props.match.params.id
        this.getCinema(id)
        this.getShows(id);
    }

    getCinema(id) {
        Axios.get(`${URL}/getCinemaName/${id}`)
        .then(response => {
            const cinema = response.data;
            this.setState({ cinema })})
    }
    
    getShows(id) {
        Axios.get(`${URL}/getShows/${id}`)
        .then(response => {
            const shows = response.data;
            this.setState({ shows })})
    }

    render(){
        
        const films = this.state.shows.map( (show, index) => {
            return(
                <FilmCinemaItem key={index} show={show} />
            ) 
        });
        
        return (
        <div>
        <h2>{this.state.cinema}</h2>
          {films}
        </div>
      );
    }
}

export default FilmCinema;