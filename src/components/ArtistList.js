import React , { Component } from 'react';
import axios from 'axios';

const URL = 'http://localhost:8080';


class AristList extends Component {

    constructor(props){
        super(props);

        this.state = {
            artists: []
        }
    }

    componentWillMount(){
        axios.get(`${URL}/allArtists`)
        .then(response => {
            const artists = response.data;
            this.setState({ artists });
        })
    }

    render(){
        const artists = this.state.artists.map( artist => {
            return(
                <div key={artist.id}>
                    <p>{artist.name} {artist.surname}</p>
                </div>
            ) 
        });
        console.log(this.state.artists);
        return(
            <div>
                {artists}
            </div>
        )
    }
}

export default AristList;
