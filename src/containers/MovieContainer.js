import React , { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { movieDetail, clearMovieDetail } from '../actions';
import '../css/Movie.css';

import Button from '@material-ui/core/Button';
import axios from 'axios';

import CastList from '../components/CastList';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import TVTransmissions from '../components/TVTransmissions'
import CinemaRepertoire from '../components/CinemaRepertoire'
import IssueDialog from '../components/IssueDialog'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';



import { MdStar } from 'react-icons/md';

const URL = 'http://localhost:8080';

const rates = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
]

class MovieContainer extends Component {
    
    //this one checks if an URL is created by clicking a movie or by typing in a url, if u typed it in, then it looks
    //for a movie in a database, else movie's data is passed throught params.

    constructor(props){
        super(props);

        this.state = {
            added: false,
            rate: 0,
            rated: false,
            sentRate:0,
            openIssue: false,
            change : false
        }
    }

    componentWillMount(){
        this.props.movieDetail(this.props.match.params.id, this.props.match.params.title).then( () =>  {
            if(this.props.login.login_data && this.props.login.login_data.username) {
                this.isMovieInToWatch(this.props.login.login_data.username);
            }
        });
    }
    //this is needed when network is slow like 3G to clear previous view before showing another
    componentWillUnmount(){
        this.props.clearMovieDetail();
    }

    isMovieInToWatch = (username) => {
        axios.get(`${URL}/getToWatchList/${username}`)
             .then( response => {
                 let found = false;
                 for(let i = 0; i < response.data.length; i++){
                    if(this.props.movies.movieDetail && (this.props.movies.movieDetail.idMovie === response.data[i].idMovie)){
                        found = true;
                        this.setState({
                            added: true
                        })
                    }
                 }

                 if( !found ){
                    this.setState({
                        added: false
                    })
                 }
             })
    }

    addToWatch = () => {
        axios.post(`${URL}/addToWatch/${this.props.movies.movieDetail.idMovie}/${this.props.login.login_data.username}`)
        .then(response => {
            if (response.data === "Successful") {
                this.setState({
                    added:true
                })
            }
        })
        .catch(err => console.log(err));
    }

    removeFromToWatch = () =>{
        axios.post(`${URL}/removeToWatch/${this.props.movies.movieDetail.idMovie}/${this.props.login.login_data.username}`)
             .then( response => {
                 if(response.data === "Successful") {
                     this.setState({
                         added:false
                     })
                 }
             })
    }

    changeRate = (event) => {

        this.setState({
            rate: event.target.value
        })
    }

    handleRateMovie = (event) => {
        axios.post(`${URL}/changeRating/${this.props.login.login_data.username}/${this.props.movies.movieDetail.idMovie}/${this.state.rate}`)
             .then( response => {
                    if(response.data === "Successful") {
                        this.setState({
                            rated:true,
                            sentRate: this.state.rate
                        })
                    }
                    this.props.movieDetail(this.props.match.params.id, this.props.match.params.title);
             })
    }

    handleAddIssue = (event) => {
        this.setState({
            openIssue: true
        })
    }


    movieTemplate = (data, logged) => (
            data.movieDetail ? 
                <div className="movieDetailsWrapper">
                    <div>
                    <img className="picture" src={data.movieDetail.pictureUrl} alt="coverage of this movie"></img>
                    {logged ?
                    <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                        <p style={{margin:"auto",fontSize:"10px"}}><i>Can you see any mistakes?</i></p>
                        <Button size="small"  onClick={this.handleAddIssue} >Let us know!</Button> 
                    </div>
                    : null }
                    </div>
                    <div className="movieDetails">
                        <div className="rating">
                            <h2 className="movie-title" >{data.movieDetail.title} </h2>
                            <h3><MdStar/>{data.movieDetail.rating.toFixed(1) || 0} / 10 </h3>
                            { logged ?
                            <div>
                                <FormControl margin="dense" style={{ width: "50px", marginLeft:"5px" }}>
                                    <Select  value={this.state.rate} onChange={this.changeRate} label="Type" id="type" name="type" >
                                        {rates.map(type => (
                                            <MenuItem key={type} value={type} >
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>    
                                {this.state.rate > 0 ?
                                <Button variant="outlined" onClick={this.handleRateMovie} styles={{marginBottom:"10px", backgroundColor:"white", border:"black"}}>Rate!</Button> 
                                :null}
                            </div>
                            : null}           
                        </div>

                        { logged && this.state.sentRate ?
                            <p><i>You have rated this movie on {this.state.sentRate}. <br></br>You can change your rate anytime</i></p>
                            : null
                        }
                        

                        <p> {data.movieDetail.description}</p>
                        <p><b>Premiere:</b> {data.movieDetail.dateOfPremiere}</p>
                        <p><b>Genre:</b> {data.movieDetail.genres.join(", ")}</p>
                        <p><b>Director:</b> {data.movieDetail.artists.filter( item => { return item.artistType === "Director"}).map(item => { return item.name + " " + item.surname}).join(", ")}</p>
                        <p><b>Writers:</b> {data.movieDetail.artists.filter( item => { return item.artistType === "Writer"}).map(item => { return item.name + " " + item.surname}).join(", ")}</p>
                        <p><b>Producer:</b> {data.movieDetail.artists.filter( item => { return item.artistType === "Producer"}).map(item => { return item.name + " " + item.surname}).join(", ")}</p>
                        <p><b>Music:</b> {data.movieDetail.artists.filter( item => { return item.artistType === "Music"}).map(item => { return item.name + " " + item.surname}).join(", ")}</p>
                        <p><b>Box Office:</b> {data.movieDetail.boxOffice} $</p>
                        <p><b>Production:</b> {data.movieDetail.country}</p>
                    
                                <p><b>Prizes:</b></p>
                                <ul > 
                                {
                                    data.movieDetail.prizes.map(prize => {
                                    return <div key={prize.idPrize}>
                                        <li>
                                            <p><b>{prize.prizeName} </b>for {prize.whatFor} in {prize.date}</p>
                                        </li>
                                    </div>
                                    })
                                }
                                </ul>
                            
                         
                        { this.props.login.login_data && this.props.login.login_data.username ? 
                          ( this.state.added ? <Button variant="outlined"onClick={this.removeFromToWatch} styles={{marginBottom:"10px", backgroundColor:"white", border:"black"}}>Remove from your Watchlist !</Button>
                            : <Button variant="outlined" onClick={this.addToWatch} styles={{marginBottom:"10px", backgroundColor:"white", border:"black"}}>Add to Watch !</Button>
                          ) : null }   

                        
                    </div>
                </div>
            : null
    )

     likeReview = (id) => {
        axios.post(`${URL}/addLikeToReview/${id}/${this.props.login.login_data.username}`)
             .then( response => {
                if(response.data ==="Successful") {
                    this.props.movieDetail(this.props.match.params.id, this.props.match.params.title);
                }
             })
      }

    render(){
        console.log("render");
        const actors = this.props.movies.movieDetail ? this.props.movies.movieDetail.artists.filter( artist => {
            return artist.artistType === "Actor";
        }) : null;
        const reviews = this.props.movies.movieDetail ? this.props.movies.movieDetail.reviews : null;
        
        const { login } = this.props;

        const logged = login.login_data ? login.login_data.logged : false;

        const username = login.login_data && login.login_data.username ? login.login_data.username : null; 
       
        const idMovie = this.props.movies.movieDetail ? this.props.movies.movieDetail.idMovie : null ;
        const transmissions = this.props.movies.movieDetail ? this.props.movies.movieDetail.transmitions : null ;
        const repertoire = this.props.movies.movieDetail ? this.props.movies.movieDetail.shows : null ;

        return(
            <div>
                {this.movieTemplate(this.props.movies, logged)}
                <IssueDialog open={this.state.openIssue} onClose={()=>this.setState({openIssue:false})} username={username} idMovie={idMovie} />
                <CastList actors={actors} />
                <TVTransmissions transmissions={transmissions}/>
                <CinemaRepertoire  repertoire={repertoire}/>
                { 
                    logged ? 
                        <ReviewForm callback={() => {
                            this.props.movieDetail(this.props.match.params.id, this.props.match.params.title);
                        }} username={username} idMovie={idMovie} />
                    : null
                }
                <ReviewList username={username} callback={this.likeReview} reviews={reviews} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ movieDetail, clearMovieDetail }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);