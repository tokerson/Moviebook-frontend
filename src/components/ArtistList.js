import React , { Component } from 'react';
import axios from 'axios';
import ArtistListItem from './ArtistListItem';
import TextField from '@material-ui/core/TextField';




const URL = 'http://localhost:8080';


class AristList extends Component {

    constructor(props){
        super(props);

        this.state = {
            artists: [],
            filtered : [],
            searching : false
        }
    }

    filterArtists = (event) => {
        let filtered = this.state.artists.filter(item => {
          //toUpperCase, so user doesn't have to bother about Upper or Lower case sensitive titles.
          const name = item.name + " " +item.surname;
          return name.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
        });
    
        this.setState({
          filtered: filtered,
          searching:  event.target.value.length > 0 
        });
    
    }

    componentWillMount(){
        this.getArtists();
    }

    getArtists = () => {
        axios.get(`${URL}/allBasicArtists`)
        .then(response => {
            const artists = response.data;
            this.setState({ artists });
        })
    }

    render(){

        let artistList = this.state.filtered.length === 0 ? this.state.artists : this.state.filtered;
        if(this.state.filtered.length === 0 && this.state.searching === true) {
          artistList = []
        }

        const artists = artistList.map( artist => {
            return(
                <ArtistListItem key={artist.id} artist={artist} />
            ) 
        });
        return(
            <div >
                <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterArtists}></TextField>
                {artists}
            </div>
        )
    }
}

export default AristList;
