import React , { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { movieDetail, clearMovieDetail } from '../actions';
import '../css/Movie.css';

import CastList from '../components/CastList';

class MovieContainer extends Component {
    
    //this one checks if an URL is created by clicking a movie or by typing in a url, if u typed it in, then it looks
    //for a movie in a database, else movie's data is passed throught params.
    componentWillMount(){
        this.props.movieDetail(this.props.match.params.id, this.props.match.params.title);
    }

    //this is needed when network is slow like 3G to clear previous view before showing another
    componentWillUnmount(){
        this.props.clearMovieDetail();
    }

    movieTemplate = (data) => (
            data.movieDetail ? 
                <div className="movieDetailsWrapper">
                    <img className="picture" src={data.movieDetail.pictureUrl} alt="coverage of this movie"></img>
                    <div className="movieDetails">
                        <div className="rating">
                            <h2 className="movie-title" >{data.movieDetail.title} </h2>
                            <h3>{data.movieDetail.rating || 0} / 10 </h3>
                        </div>
                        <p> {data.movieDetail.description}</p>
                        <p><b>Premiere:</b> {data.movieDetail.dateOfPremiere}</p>
                        <p><b>Genre:</b> {data.movieDetail.genres.join(", ")}</p>
                        <p><b>Box Office:</b> {data.movieDetail.boxOffice} $</p>
                        <p><b>Production:</b> {data.movieDetail.country}</p>
                    </div>
                </div>
            : null
    )

    render(){
        console.log(this.props.movies);
        const actors = this.props.movies.movieDetail ? this.props.movies.movieDetail.artists.filter( artist => {
            return artist.artistType === "Actor";
        }) : null;
        return(
            <div>
                {this.movieTemplate(this.props.movies)}
                <CastList actors={actors} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ movieDetail, clearMovieDetail }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);