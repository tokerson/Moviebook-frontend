import React , { Component } from 'react';
import Axios from 'axios';
import TvProgramFilmsItem from './TvProgramFilmsItem';

const URL = 'http://localhost:8080';

class TvProgramFilms extends Component {

    state = {
        transmitions: [],
        station: this.props.match.params.id
    }


    componentWillMount() {
        this.getTransmitions();
    }

    
    getTransmitions() {
        Axios.get(`${URL}/getTransmitions/${this.state.station}`)
        .then(response => {
            const transmitions = response.data;
            this.setState({ transmitions })})
    }

    render(){
        
        const films = this.state.transmitions.map( (transmition, index) => {
            return(
                <TvProgramFilmsItem key={index} transmition={transmition} />
            ) 
        });
        
        return (
        <div>
        <h2>{this.state.station}</h2>
          {films}
        </div>
      );
    }
}

export default TvProgramFilms;