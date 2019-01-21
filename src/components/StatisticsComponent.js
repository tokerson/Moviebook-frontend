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
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)


const URL = 'http://localhost:8080';


class StatisticsComponent extends Component {
  
  state = {
    reviewChartVisible: false,
    movieChartVisible: false,
    reviewChartData: [],
    movieChartData: []
  }


    handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);

      axios.get(`${URL}/getReviewsStatistics/${data.get('initialDate')}/${data.get('lastDate')}`)
           .then( response => {
             this.setState({
               reviewChartVisible:true,
               reviewChartData: response.data
             })
           })

      axios.get(`${URL}/getMoviesStatistics/${data.get('initialDate')}/${data.get('lastDate')}`)
           .then( response => {
             this.setState({
               movieChartVisible:true,
               movieChartData: response.data
             })
           })

    }

    prepareReviewData() {
      const data = this.state.reviewChartData;
      const returnData = [];
      for(var i = 0; i < data.length; ++i) {
        returnData.push(['id '+data[i].idReview, data[i].amount]);
      }
      return returnData;
    }

    prepareMovieData() {
      const data = this.state.movieChartData;
      const returnData = [];
      for(var i = 0; i < data.length; ++i) {
        returnData.push([data[i].title, data[i].amountOfRatings]);
      }
      return returnData;
    }

    render() {
      const login = this.props.login;
      const reviewChartVisible = this.state.reviewChartVisible;
      const movieChartVisible = this.state.movieChartVisible;
      const reviewData = this.prepareReviewData();
      const movieData = this.prepareMovieData();

      const reviews = this.state.reviewChartData ? this.state.reviewChartData.map( review => {
        return(
            <div key={review.idReview} className="reviewItemStatistics">
              <p><b>Author: </b>{review.author}</p>
              <p><b>Id: </b>{review.idReview}</p>
              <p><b>Movie title: </b>{review.title}</p>
              <p><b>Date: </b>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(review.date)}</p>
              <p><b>Content: </b>{review.content}</p>
            </div>
        )
    }) : null;

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
              { reviewChartVisible ?
                    <div>
                      <h2>Review statistics:</h2>
                      <ColumnChart data={reviewData} />
                      <div className="reviewListWrapper">
                        {reviews}  
                      </div> 
                    </div>
                    : null
                  }
              { movieChartVisible ?
                    <div>
                      <h2>Movie statistics:</h2>
                      <ColumnChart data={movieData} />
                    </div>
                    : null
                  }
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