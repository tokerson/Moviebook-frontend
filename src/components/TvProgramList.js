import React , { Component } from 'react';
import axios from 'axios';
import TvProgramListItem from './TvProgramListItem';
import TextField from '@material-ui/core/TextField';




const URL = 'http://localhost:8080';


class TvProgramList extends Component {

    constructor(props){
        super(props);

        this.state = {
            stations: [],
            filtered : [],
            searching : false
        }
    }

    filterArtists = (event) => {
        let filtered = this.state.stations.filter(item => {
          //toUpperCase, so user doesn't have to bother about Upper or Lower case sensitive titles.
          return item.name.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
        });
    
        this.setState({
          filtered: filtered,
          searching:  event.target.value.length > 0 
        });
    
    }

    componentWillMount(){
        this.getStations();
    }

    getStations = () => {
        axios.get(`${URL}/allStations`)
        .then(response => {
            const stations = response.data;
            this.setState({ stations });
        })
    }

    render(){
        let stationList = this.state.filtered.length === 0 ? this.state.stations : this.state.filtered;
        if(this.state.filtered.length === 0 && this.state.searching === true) {
          stationList = []
        }
        const stations = stationList.map( station => {
            return(
                <TvProgramListItem key={station.name} station={station} />
            ) 
        });
        return(
            <div >
                <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterArtists}></TextField>
                {stations}
            </div>
        )
    }
}

export default TvProgramList;
