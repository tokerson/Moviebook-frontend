import React , { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import '../css/Statistics.css'

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import MovieListItem from './MovieListItem';


const URL = 'http://localhost:8080';


class StatisticsComponent extends Component {
   
    handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);

      axios.get(`${URL}/getReviewsStatistics/${data.get('initialDate')}/${data.get('lastDate')}`)
           .then( response => {
             console.log(response.data);
           })
      // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(data.get('initialDate').dateTime));
    }

    render() {
      const login = this.props.login;
      return(
        <div>
          { login.status === "Salesman" ? 
            <div className="statsWrapper">
              <form onSubmit={this.handleSubmit} className="formWrapper">
                  <TextField type="date" id="initialDate" name="initialDate" label="From" InputLabelProps={{
                      shrink: true,
                  }} variant="outlined" margin="dense"></TextField>
                  <TextField type="date" id="lastDate" name="lastDate" label="To" InputLabelProps={{
                      shrink: true,
                  }} variant="outlined" margin="dense"></TextField>
                  <Button variant="outlined"type="submit" margin="dense">Submit</Button>
              </form>
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


export default connect(mapStateToProps)(StatisticsComponent);