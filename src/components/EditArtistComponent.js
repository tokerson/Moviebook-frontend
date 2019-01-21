import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import '../css/AddMovieForm.css';
import axios from 'axios';
import ArtistListItem from './ArtistListItem'
import { NavLink } from 'react-router-dom'


const URL = 'http://localhost:8080';

class EditArtistComponent extends Component {

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
                <NavLink key={artist.id} to={{
                    pathname: '/editArtist/'.concat(artist.id)
                }} style={{textDecoration:"none", color:"black"}}>
                    <ArtistListItem artist={artist} />
                </NavLink>
            ) 
        });
        return(
            <div>
                { this.props.login.status !== "Administrator" && this.props.login.status !== "Editor"
                    ? <Redirect to="/home"/> :
                    <div >
                        <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterArtists}></TextField>
                        {artists}
                    </div> 
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
export default connect(mapStateToProps)(EditArtistComponent);