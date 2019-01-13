import React , { Component } from 'react';
import axios from 'axios';
import MovieListItem from './MovieListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const URL = 'http://localhost:8080';

class Account extends Component {
    constructor(props){
      super(props);

      this.state = {
        filmsToWatch: []
      }
    }

    componentWillMount() {
      this.getFilmsToWatch();
    }

    getFilmsToWatch = () => {
      //need to change user5 to login after Kuba's change
      axios.get(`${URL}/getFilmsToWatch/user5`)
      .then(response=>{
        const filmsToWatch = response.data;
        this.setState({ filmsToWatch});
      })
    }

    render() {

      return(
        <div>
          <h2>Films to watch:</h2>
          <Paper style={{maxHeight: 500, overflow: 'auto'}}>
            <List> 
              <ListItem>
              <MovieListItem className="list" movies={this.state.filmsToWatch}/>   
              </ListItem>
            </List>
          </Paper>
        </div>
      )
    }


}

export default Account;