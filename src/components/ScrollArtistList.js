import React , { Component } from 'react';
import axios from 'axios';
import ScrollArtistListItem from './ScrollArtistListItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../css/ScrollListItem.css'
const URL = 'http://localhost:8080';

const artistType = [
    'Actor',
    'Director',
    'Writer'
]

class ScrollAristList extends Component {

    constructor(props){
        super(props);

        this.state = {
            artists: [],
            filtered : [],
            searching : false,
            chosenActors : [],
            roles: [],
            artistTypes : []

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
                role: "",
                types: []
            })
        }

        this.setState({
            chosenActors: chosen
        })

        // console.log(this.state.chosenActors)
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

    handleSelectType = (event, id) =>{
        let artists = this.state.chosenActors;

        for(let i = 0; i < artists.length ; i++){
            if(artists[i].id === id) {
                artists[i].types = event.target.value
            }
        }

        this.setState({
            chosenActors: artists
        });

        console.log(this.state.chosenActors)
    }

    render(){

        let artistList = this.state.filtered.length === 0 ? this.state.artists : this.state.filtered;
        if(this.state.filtered.length === 0 && this.state.searching === true) {
          artistList = []
        }
        

        const artists = artistList.map( artist => {
            let artistTypes = [];
            for(let i = 0; i < this.state.chosenActors.length ; i++){
                if(this.state.chosenActors[i].id === artist.id) {
                    artistTypes = this.state.chosenActors[i].types;
                }
            }
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

                        <FormControl  variant="outlined" margin="dense" style={{width:"150px"}}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-types-simple"
                            >
                                Type
                    </InputLabel>
                            <Select disabled={!chosen} multiple value={artistTypes} onChange={ (event) => this.handleSelectType(event, artist.id)} label="Type" id="type" name="type" input={
                                <OutlinedInput
                                    labelWidth={1}
                                    name="types"
                                    id="outlined-types-simple"
                                />
                            }>
                                {artistType.map(type => (
                                    <MenuItem key={type} value={type} >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>                        
                            <TextField disabled={!chosen} value={value} type="text" id={artist.id.toString()} name="role" label="Played as" variant="outlined"  margin="dense" onChange={this.setArtistRole} ></TextField>
                        
                        
                        
                    </ListItem>
                </div>
                
            ) 
        });
        
        return(
            <div >
                <TextField type="text" id="searchActor" name="searchActor" label="Find Arist" variant="outlined"  margin="dense" onChange={this.filterArtists}></TextField>
                <Paper style={{maxHeight: 300, overflow: 'auto'}}>
                    <List>{artists}</List>
                </Paper>
                
            </div>
        )
    }
}

export default ScrollAristList;
