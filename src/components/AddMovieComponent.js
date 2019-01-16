import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../css/AddMovieForm.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';


// take genres from database
const genres = [
    'Drama',
    'Comedy',
    'Horror',
    'Romance'
  ];

const styles = {

}

class AddMovieComponent extends Component {

    state={
        picture:'',
        genres:[]
    }

    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }

    handleSubmit= (event)=>{
        event.preventDefault();

        const data = new FormData(event.target);
        console.log(data.get('title'))
        console.log(data.get('date'))
        console.log(data.get('boxOffice'))
        console.log(data.get('description'))
        console.log(data.get('pictureUrl'))
        console.log(data.get('language'))
        console.log(data.get('genre'))
    }

    handlePictureChange = (event) => {
        this.setState({
            picture: event.target.value
        })
    }

    handleSelectGenre = (event) => {
        this.setState({
            genres:event.target.value
        })
    }

    formRender = () => {
        const { classes } = this.props;
        return <div className="pictureWithForm">
            <div className="pictureWrapper">
                <img className="picture" src={this.state.picture} alt=""></img>
            </div>
            <form onSubmit={this.handleSubmit} className="movieForm">
            
                <TextField type="text" id="title" name="title" label="Movie title" variant="outlined"  margin="dense"></TextField>
                <TextField type="date" id="date" name="date" label="Premiere date" InputLabelProps={{
                    shrink: true,
                }} variant="outlined" margin="dense"></TextField>
                <TextField type="text" id="boxOffice" name="boxOffice" label="BoxOffice" variant="outlined" margin="dense"></TextField>
                <TextField type="text" id="description" multiline={true} name="description" label="Description" variant="outlined" margin="dense"></TextField>
                <TextField type="text" id="pictureUrl" multiline={true} name="pictureUrl" label="URL of picture" variant="outlined" margin="dense" onChange={this.handlePictureChange}></TextField>
                <TextField type="text" id="language" name="language" label="Language of movie" variant="outlined" margin="dense"></TextField>
                <FormControl variant="outlined" classes={classes.formControl} margin="dense">
                    <InputLabel
                        ref={ref => {
                        this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                    >
                        Genre
                    </InputLabel>
                    <Select multiple value={this.state.genres} onChange={this.handleSelectGenre} label="Genre" id="genre" name="genre" input={
                        <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="genre"
                        id="outlined-genre-simple"
                      />
                    }>
                        {genres.map(genre => (
                            <MenuItem key={genre} value={genre} >
                                {genre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined"type="submit" margin="dense">Add movie</Button>
                
                
            </form>
        </div>
    }

    render(){
        const login = this.props.login;
        return(
            <div>
                {login.status !== "Administrator" && login.status !== "Editor"
                ? <Redirect to="/home"/>
                : this.formRender()
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
export default connect(mapStateToProps)(withStyles(styles)(AddMovieComponent));