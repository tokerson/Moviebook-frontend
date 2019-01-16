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
            searching : false,
            chosenActors : [],
            roles: []
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

    chooseActor = (id) => {
        let chosen = this.state.chosenActors;
      
        let wasChosen = false;
        for (let i = 0; i < chosen.length ; i++) {
            if (chosen[i].id === id) {
                chosen.splice(i, 1);
                wasChosen = true;
            }
        }
        if(!wasChosen) {
            chosen.push({
                id: id,
                role: ""
            })
        }

        this.setState({
            chosenActors: chosen
        })

        console.log(this.state.chosenActors)
    }

    setArtistRole = (event) => {

        let chosen = this.state.chosenActors;
        let id = parseInt(event.target.id);
        for (let i = 0; i < chosen.length ; i++) {
            if (chosen[i].id === id) {
                chosen[i].role = event.target.value;
            }
        }

        this.setState({
            chosenActors: chosen
        })

        console.log(this.state.chosenActors)

    }

    render(){

        let artistList = this.state.filtered.length === 0 ? this.state.artists : this.state.filtered;
        if(this.state.filtered.length === 0 && this.state.searching === true) {
          artistList = []
        }

        const artists = artistList.map( artist => {
            let chosen = false;
            let value="";
            for (let i = 0; i < this.state.chosenActors.length; i++) {
                if (this.state.chosenActors[i].id === artist.id) {
                    chosen = true;
                    value=this.state.chosenActors[i].role;
                }
            }
            return(
                <div key={artist.id}  >
                    <ListItem >
                        <div style={{width:"100%"}} onClick={() => this.chooseActor(artist.id)}>
                            <ScrollArtistListItem selected={chosen} artist={artist} />
                        </div>
                            <TextField disabled={!chosen} value={value} type="text" id={artist.id.toString()} name="role" label="Played as" variant="outlined"  margin="dense" onChange={this.setArtistRole} ></TextField>
                        
                        
                        
                    </ListItem>
                </div>
                
            ) 
        });
        return(
            <div >
                <TextField type="text" id="searchActor" name="searchActor" label="Find Actor" variant="outlined"  margin="dense" onChange={this.filterArtists}></TextField>
                <Paper style={{maxHeight: 300, overflow: 'auto'}}>
                    <List>{artists}</List>
                </Paper>
                
            </div>
        )
    }
}

export default ScrollAristList;
