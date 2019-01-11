import React , { Component } from 'react';
import axios from 'axios';
import CinemaListItem from './CinemaListItem';
import TextField from '@material-ui/core/TextField';




const URL = 'http://localhost:8080';


class CinemaList extends Component {

    constructor(props){
        super(props);

        this.state = {
            cinemas: [],
            filtered : [],
            searching : false
        }
    }

    filterArtists = (event) => {
        let filtered = this.state.cinemas.filter(item => {
          //toUpperCase, so user doesn't have to bother about Upper or Lower case sensitive titles.
          const name = item.name + " " +item.city;
          return name.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
        });
    
        this.setState({
          filtered: filtered,
          searching:  event.target.value.length > 0 
        });
    
    }

    componentWillMount(){
        this.getCinemas();
    }

    getCinemas = () => {
        axios.get(`${URL}/allCinemas`)
        .then(response => {
            const cinemas = response.data;
            this.setState({ cinemas });
        })
    }

    render(){

        let cinemaList = this.state.filtered.length === 0 ? this.state.cinemas : this.state.filtered;
        if(this.state.filtered.length === 0 && this.state.searching === true) {
          cinemaList = []
        }

        const cinemas = cinemaList.map( cinema => {
            return(
                <CinemaListItem key={cinema.idCinema} cinema={cinema} />
            ) 
        });
        return(
            <div >
                <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterArtists}></TextField>
                {cinemas}
            </div>
        )
    }
}

export default CinemaList;
