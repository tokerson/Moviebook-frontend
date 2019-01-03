import React , { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { movieDetail, clearMovieDetail } from '../actions';

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
            <div>
                <img src={data.movieDetail.pictureUrl} alt="coverage of this movie"></img>
                <h3>Title : {data.movieDetail.title}</h3>
                <h3>Description: {data.movieDetail.description}</h3>
                <h4>Premiere: {data.movieDetail.dateOfPremiere}</h4>
            </div>
        : null
    )

    render(){
        return(
            <div>
                {this.movieTemplate(this.props.movies)}
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