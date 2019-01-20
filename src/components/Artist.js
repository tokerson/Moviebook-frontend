import React , { Component } from 'react';
import Axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import MovieListItem from './MovieListItem';
import { NavLink } from 'react-router-dom'

const URL = 'http://localhost:8080';

class Artist extends Component {

    state = {
        surname: "",
        name: "",
        origin: "",
        birthDate: "",
        pictureUrl: "",
        types: [],
        prizes: [],
        films: []
    }


    componentWillMount() {
        const id = this.props.match.params.id
        this.getArtist(id);
    }

    getArtist(id) {
        Axios.get(`${URL}/getArtist/${id}`)
        .then(response => {
            const surnameResult = response.data.surname;
            const nameResult = response.data.name;
            const originResult = response.data.origin;
            const birthDateResult = response.data.birthDate;
            const pictureUrlResult = response.data.pictureUrl;
            const typesResult = response.data.types;
            const prizesResult = response.data.prizes;
            const filmsResult = response.data.typeAndFilms;
            this.setState({
                surname: surnameResult,
                name: nameResult,
                origin: originResult,
                birthDate: birthDateResult,
                pictureUrl: pictureUrlResult,
                types: typesResult,
                prizes: prizesResult,
                films: filmsResult
            })
        })
    }

    render(){
        
        const artists = this.state.films.map(typeAndFilms => {
            return(
                <div key={typeAndFilms.type} className="movieDetailsWrapper">
                    <div className = "movieDetails" style={{textDecoration:'none',width:"100%"}}>
                        <h3>{typeAndFilms.type}</h3>
                        {
                            typeAndFilms.films.map(movie => {
                            return <div key={movie.idMovie}>
                                <ListItem>
                                <NavLink to={{
                                    pathname: '/films/'.concat(movie.idMovie + "/").concat(movie.title),
                                    }} style={{textDecoration:'none',width:"100%"}}>
                                <MovieListItem movie={movie}/>   
                                </NavLink>
                                </ListItem>

                            </div>
                            })
                  }
                    </div>
                </div>
            )
        });
        return (
            <div>
                {
                this.state.name !== undefined ? 
                
                 <div>
                    <div className="movieDetailsWrapper">
                        <img className="picture" src={this.state.pictureUrl} alt="coverage of this artist"></img>
                        <div className="movieDetails">
                            <h2>{this.state.name} {this.state.surname}</h2>
                            <p><b>Origin: </b>{this.state.origin}</p>
                            <p><b>Date of birth: </b>{this.state.birthDate}</p>
                            <p><b>Functions: </b>{this.state.types.filter( item => { return item}).join(", ")}</p>
                        </div>
                    </div>
                    {   
                        this.state.prizes.length !== 0 ? 
                        <div className="movieDetailsWrapper">
                        <div className="movieDetails"> 
                            <h3>Prizes</h3>
                            <ul > 
                            {
                                this.state.prizes.map(prize => {
                                return <div key={prize.idPrize}>
                                    <li>
                                        <p><b>{prize.prizeName} </b>for {prize.whatFor} in {prize.date}</p>
                                    </li>
                                </div>
                                })
                            }
                            </ul>
                        </div>
                         </div> 
                        : null
                    }
                    {artists}
                </div> 
                : null
                }
            </div>

        );
    }
}

export default Artist;