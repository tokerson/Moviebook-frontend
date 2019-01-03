import JSON from '../json/Movies.json';
import axios from 'axios'
const URL = 'http://localhost:8080'


export function movieListAll(){

    
    
    const movies = axios.get(`${URL}/allMovies`)
                   .then(response => response.data)
                   .catch(err => console.log(err))
                
    return {
        type:'GET_MOVIES_ALL',
        payload: movies
    }
}

export function movieDetail(id, title){
    
    const movie = axios.get(`${URL}/movie/${id}`)
                  .then(response => response.data)
                  .catch(err => console.log(err));
                  
    const sth = movie;
    // console.log(movie);
    return {
        type:'GET_MOVIE_DETAIL',
        payload: movie
    }
}

export function clearMovieDetail(){
    return {
        type: 'CLEAR_MOVIE_DETAIL',
        payload: null
    }
}