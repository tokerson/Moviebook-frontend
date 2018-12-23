import React , { Component } from 'react';
import JSON from '../json/Movies.json';

class Movie extends Component {
    
    //this one checks if an URL is created by clicking a movie or by typing in a url, if u typed it in, then it looks
    //for a movie in a database, else movie's data is passed throught params.
    componentWillMount(){
        console.log(this.props.match.params);
        if(this.props.location.hasOwnProperty('params') === false){
                const movies = JSON;
                const movie = movies.filter( movie => {
                    return movie.title === this.props.match.params.title ;
                })
                this.setState({
                    title : movie[0].title,
                    director : movie[0].director,
                    coverURL : movie[0].coverURL,
                    premiere : movie[0].premiere
                });
        }
        else {
            this.setState({
                title : this.props.location.params.title,
                director : this.props.location.params.director,
                coverURL : this.props.location.params.coverURL,
                premiere : this.props.location.params.premiere
            });
        }

    }

    render(){
    return(
        <div>
            <img src={this.state.coverURL} alt="coverage of this movie"></img>
            <h3>Title : {this.state.title}</h3>
            <h3>Director: {this.state.director}</h3>
            <h4>Premiere: {this.state.premiere}</h4>
        </div>
    );
    }
}

export default Movie;