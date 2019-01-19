import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const URL = 'http://localhost:8080';


class ReviewForm extends Component {

    state = {
        review : ""
    }

    onTextfieldChange = (event) => {
        this.setState({
            review: event.target.value
        })
    }

    sendReview = () => {
        const review = this.state.review;

        axios.post(`${URL}/addReview/${this.props.idMovie}/${this.props.username}/${review}`)
        .then(response => {
            this.setState({
                review: ""
            });
        })
        .catch(err => console.log(err));
        
    }   

    render(){
        return(
            <div>
                <h2>Write your review</h2>
                <form>
                    <TextField value={this.state.review} onChange={this.onTextfieldChange} label="Give us your thoughts" margin="normal" multiline={true} variant="outlined" style={{width:"100%"}}/>
                    <Button disabled={this.state.review === ""} onClick={this.sendReview} size="medium" style={{background:"#dfdedeb6",border:"groove", borderRadius:"3px"}}>Send your review</Button>
                </form>
            </div>
        );
    }
}

export default ReviewForm;