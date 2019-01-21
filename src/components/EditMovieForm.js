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
import ScrollArtistList from './ScrollArtistList';
import Axios from 'axios';
import { Dialog, DialogTitle } from '@material-ui/core';

const URL = 'http://localhost:8080';


const styles = {

}

class EditMovieForm extends Component {

    state={
        picture:'',
        genres:[],
        labelWidth:0,
        chosenArtists:[],
        open: false,
        success: false,
        allGenres:[],
        title:"",
        premiere:"",
        boxOffice: 0,
        description: "",
        language:'',
        country:'',
        artists:[]
    }

    getMovie(id) {
        Axios.get(`${URL}/movie/${id}`)
        .then(response => {
            let chosenArtists = [];
            for(let i = 0; i < response.data.artists.length; i++){
                let found = false;
                for(let j = 0; j < chosenArtists.length; j++) {
                    if(chosenArtists[j].id === response.data.artists[i].idArtist) {
                        chosenArtists[j].types.push(response.data.artists[i].artistType);
                        found = true;
                    }
                }
                if(!found){
                    chosenArtists.push({
                        id: response.data.artists[i].idArtist,
                        role: response.data.artists[i].role,
                        types: [response.data.artists[i].artistType]
                    })
                }
            }

            this.setState({
                title:response.data.title,
                premiere:response.data.dateOfPremiere,
                boxOffice: response.data.boxOffice,
                description: response.data.description,
                picture: response.data.pictureUrl,
                language:response.data.language,
                country:response.data.country,
                genres:response.data.genres,
                chosenArtists: chosenArtists
            });
            console.log(this.state.chosenArtists)
        })
    }
    componentWillMount() {
        this.getGenres();
        this.getMovie(this.props.match.params.id);
    }

    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }

    getGenres = () => {
        Axios.get(`${URL}/getAllGenres`)
            .then(response => {
                this.setState({
                    allGenres: response.data
                })
            })
    }

    handleSubmit= (event)=>{
        event.preventDefault();

        const data = new FormData(event.target);

        try {
        let url = encodeURIComponent(data.get('pictureUrl'));
        var changed = url.replace(/%/g, "_");
        } catch (err) {
            this.setState({
                success : false,
                open: true
            })
            return;
        }

        var genres = data.get('genre').replace(/,/g, "_");

        console.log(genres);
        Axios.get(`${URL}/updateMovie/${this.props.match.params.id}/${data.get('title')}/${data.get('language')}/${data.get('date')}/${data.get('boxOffice')}/${data.get('country')}/${data.get('description')}/${changed}/${genres}`)
        .then(response => {
            console.log(response.data)
            if( response.data !== -1){
                const idMovie = response.data;
                console.log(idMovie)
                Axios.get(`${URL}/beforeUpdateArtistTypeAndAssignToFilm/${idMovie}`)
                .then(response => {
                    console.log(this.state.chosenArtists)
                    for(var i = 0; i < this.state.chosenArtists.length; ++i) {
        
                        var types = this.state.chosenArtists[i].types;
                        var connectedTypes;
        
                        connectedTypes = "".concat(types[0]);
        
                        for(var j = 1; j < types.length; ++j) {
                            connectedTypes = connectedTypes.concat("_", types[j]);
                        }
                        
                        var role = this.state.chosenArtists[i].role;
                        if (role === "")
                            role ="null";

                        Axios.get(`${URL}/addArtistTypeAndAssignToFilm/${this.state.chosenArtists[i].id}/${role}/${connectedTypes}/${idMovie}`)
                        .then(response => {
                            let success = false;
                            if( response.data === "Successful"){
                                success = true;
                            }
                            this.setState({
                                success: true,
                                open: true
                            })
                        })
                        .catch(err => this.setState({
                            success : false,
                            open: true
                        }))
        
                    }
                })
                .catch(err => this.setState({
                    success : false,
                    open: true
                }))
            }
        })
        .catch(err => this.setState({
            success : false,
            open: true
        }))

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

    handleChooseArtist = (chosenArtists) => {
        this.setState({
            chosenArtists : chosenArtists
        })
    }

    onDialogClose = () => {
        this.setState({
            open: false
        })
    }

    formRender = () => {
        console.log(this.state.chosenArtists)
        const { classes } = this.props;
        return <div className="pictureWithForm">
                <Dialog open={this.state.open} onClose={this.onDialogClose}> 
                    { this.state.success ? <DialogTitle>You successfuly added new movie</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
            <div className="pictureWrapper">
                <img className="picture" src={this.state.picture} alt=""></img>
            </div>
            <form onSubmit={this.handleSubmit} className="movieForm">
            
                <TextField type="text" id="title" name="title" value={this.state.title} onChange={(event)=>this.setState({title:event.target.value})} label="Movie title" variant="outlined"  margin="dense"></TextField>
                <TextField type="date" id="date" name="date" label="Premiere date" InputLabelProps={{
                    shrink: true,
                }} variant="outlined" value={this.state.premiere} onChange={(event)=>this.setState({premiere:event.target.value})} margin="dense"></TextField>
                <TextField type="text" value={this.state.boxOffice} onChange={(event)=>this.setState({boxOffice:event.target.value})} id="boxOffice" name="boxOffice" label="BoxOffice" variant="outlined" margin="dense"></TextField>
                <TextField type="text" value={this.state.description} onChange={(event)=>this.setState({description:event.target.value})} id="description" multiline={true} name="description" label="Description" variant="outlined" margin="dense"></TextField>
                <TextField type="text" value={this.state.picture} onChange={(event)=>this.setState({picture:event.target.value})} id="pictureUrl" multiline={true} name="pictureUrl" label="URL of picture" variant="outlined" margin="dense" onChange={this.handlePictureChange}></TextField>
                <TextField type="text" value={this.state.language} onChange={(event)=>this.setState({language:event.target.value})} id="language" name="language" label="Language of movie" variant="outlined" margin="dense"></TextField>
                <TextField type="text" value={this.state.country} onChange={(event)=>this.setState({country:event.target.value})} id="country" name="country" label="Country" variant="outlined" margin="dense"></TextField>
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
                        {this.state.allGenres.map(genre => (
                            <MenuItem key={genre.name} value={genre.name} >
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <ScrollArtistList chosenActors={this.state.chosenArtists} callback={this.handleChooseArtist}/>
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
export default connect(mapStateToProps)(withStyles(styles)(EditMovieForm));