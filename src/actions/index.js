import JSON from '../json/Movies.json';
//import axios from 'axios'



export function movieListAll(){
    
    const movies = JSON
    
    return {
        type:'GET_MOVIES_ALL',
        payload: movies
    }
}