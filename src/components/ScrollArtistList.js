import React , { Component } from 'react';
import axios from 'axios';
import ScrollArtistListItem from './ScrollArtistListItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../css/ScrollListItem.css'
const URL = 'http://localhost:8080';


class ScrollAristList extends Component {

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
        axios.get(`${URL}/allArtists`)
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
                <div key={artist.id}>
                    <ListItem >
                        <ScrollArtistListItem className="scrollListItem" artist={artist} />
                    </ListItem>
                </div>
                
            ) 
        });
        return(
            <div >
                <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterArtists} style={{margin:"auto"}}></TextField>
                <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                    <List>{artists}</List>
                </Paper>
                
            </div>
        )
    }
}

export default ScrollAristList;
