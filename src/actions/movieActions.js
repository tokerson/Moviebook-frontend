import JSON from '../json/Movies.json';
//import axios from 'axios'

export function movieListAll(){
    
    const movies = JSON

    return {
        type:'GET_MOVIES_ALL',
        payload: movies
    }
}

export function movieDetail(id, title){
    const movie = JSON.filter( movie => {
        return movie.id === id && movie.title === title ;
    })

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