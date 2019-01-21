import React , { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom'


import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import MovieListItem from './MovieListItem';


const URL = 'http://localhost:8080';


class ToWatchList extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        filmsToWatch: []
      }
    }

    componentDidMount() {
      this.getFilmsToWatch();
      
    }

    getFilmsToWatch = () => {
      axios.get(`${URL}/getFilmsToWatch/${this.props.login.login_data.username}`)
      .then(response=>{
        const filmsToWatch = response.data;
        this.setState({ filmsToWatch});
      })
    }

    render() {
      const login = this.props.login;
      return(
        <div>
          { login.status !== "" ? 
            <div>
              <h2>Films to watch:</h2>
              <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                  <List > 
                    {
                      this.state.filmsToWatch.map(movie => {
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
                  </List>
              </Paper>
            </div>
            : <Redirect to="/home"/>}
        </div>
      )
    }


}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps)(ToWatchList);