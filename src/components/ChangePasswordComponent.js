import React , { Component } from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/AddMovieForm.css';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dialog, DialogTitle } from '@material-ui/core';


const URL = 'http://localhost:8080';

class ChangePasswordComponent extends Component {
    constructor(props){
      super(props);
      
      this.state = {
          open: false,
          success: false,
          wrongRepeat:false,
          wrongOld: false
      }
      
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.target);

        if(data.get('newpass') !== data.get('repeatpass')) {
            this.setState({
                wrongRepeat: true
            });
            return;
        }

        axios.get(`${URL}/changePassword/${this.props.login.login_data.username}/${data.get('oldpass')}/${data.get('newpass')}`)
        .then(response => {
            if( response.data === "Successful"){
                this.setState({
                    wrongOld: false,
                    success: true,
                    open: true
                })
            }
            else {
                this.setState({
                    wrongOld: true,
                    success: false,
                    open: true
                })}
        })
        .catch(err => this.setState({
            success : false,
            open: true
        }))

        this.setState({
            open: true
        })
        
    }

    onDialogClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
      const login = this.props.login;

      return(
        <div>
          { login.status !== "" ? 
            <div >
                <Dialog open={this.state.open} onClose={this.onDialogClose}> 
                    { this.state.success ? <DialogTitle>You changed password successfuly</DialogTitle> : <DialogTitle>Operation Unsuccessful</DialogTitle>}
                </Dialog>
                <form onSubmit={this.handleSubmit} className="movieForm">
                    <TextField error={this.state.wrongOld} type="password" id="oldpass" onChange={()=>this.setState({wrongOld: false})} name="oldpass" label="Old Password" variant="outlined" margin="dense"></TextField>
                    <TextField type="password" id="newpass" name="newpass" label="New Password" variant="outlined" margin="dense"></TextField>
                    <TextField error={this.state.wrongRepeat} type="password" id="repeatpass" onChange={()=>this.setState({wrongRepeat: false})} name="repeatpass" label="Repeat new Password" variant="outlined" margin="dense"></TextField>
                    <Button variant="outlined"type="submit" margin="dense">Change Password</Button>
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


export default connect(mapStateToProps)(ChangePasswordComponent);