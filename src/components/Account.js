import React , { Component } from 'react';
import axios from 'axios';
import MovieListItem from './MovieListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const URL = 'http://localhost:8080';

class Account extends Component {
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
      //need to change user5 to login after Kuba's change
      console.log(this.props.login.login_data.username);

      axios.get(`${URL}/getFilmsToWatch/${this.props.login.login_data.username}`)
      .then(response=>{
        const filmsToWatch = response.data;
        this.setState({ filmsToWatch});
      })
      console.log(this.props.login.login_data.username);
    }

    render() {

      const login = this.props.login;
      return(
        <div>
          { login.status !== "" ? 
          <div>
            <h2>Films to watch:</h2>
            <Paper style={{maxHeight: 500, overflow: 'auto'}}>
              <List> 
                <ListItem>
                  <MovieListItem movies={this.state.filmsToWatch}/>   
                </ListItem>
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
export default connect(mapStateToProps)(Account);