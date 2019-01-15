import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router'
import sharedInstance from 'jss';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import '../css/AddMovieForm.css'

class AddMovieComponent extends Component {


    handleSubmit= (event)=>{
        event.preventDefault();

        const data = new FormData(event.target);
        console.log(data.get('title'))
        console.log(data.get('date'))
        console.log(data.get('boxOffice'))
        console.log(data.get('description'))
        console.log(data.get('pictureUrl'))
        console.log(data.get('language'))
    }

    formRender = () => {
        return <div>
            <form onSubmit={this.handleSubmit} className="movieForm">
                <TextField type="text" id="title" name="title" placeholder="Movie title"></TextField>
                <TextField type="date" id="date" name="date" placeholder="Pick premiere date" InputLabelProps={{
                    shrink: true,
                }}></TextField>
                <TextField type="text" id="boxOffice" name="boxOffice" placeholder="BoxOffice"></TextField>
                <TextField type="text" id="description" multiline={true} name="description" placeholder="Add description"></TextField>
                <TextField type="text" id="pictureUrl" multiline={true} name="pictureUrl" placeholder="pictureUrl"></TextField>
                <TextField type="text" id="language" name="language" placeholder="Language of movie"></TextField>
                <Button type="submit">Add movie</Button>
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
export default connect(mapStateToProps)(AddMovieComponent);