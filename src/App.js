import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './css/App.css';

import Home from './components/Home';
import AdminTools from './components/AdminTools';
import Account from './components/Account';
import SalesmanTools from './components/SalesmanTools';
import EditorTools from './components/EditorTools';
import Actors from './components/Actors'
import MovieList from './components/MovieList'
import Movie from './components/Movie'
import TextField from '@material-ui/core/TextField';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import axios from 'axios';
import { DialogTitle, DialogContent } from '@material-ui/core';

class App extends Component {
  state = {
    loginOpen: false,
    username: '',
    password: '',
    showLogOut: false,
    showLogIn: true,
    showAccoutOptions: false,
    showAdministrator: false,
    showSalesman: false,
    showEditor: false,
    showRegister: false,
    passwordRetyped: '',
    showUnsuccessful: false,
    alertContent: '',
  };

  handleClickOpenLogin = () => {
    this.setState({ loginOpen: true });
  }

  handleClickLogOut = () => {
    this.setState({ 
      showLogIn: true,
      showLogOut: false, 
      showAccoutOptions: false,
      showAdministrator: false,
      showEditor: false,
      showSalesman: false, 
      username: '',
    })
  }

  handleUsernameChange(event) {
    
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    
    this.setState({
      password: event.target.value,
    });
  }

  handlePasswordRetypedChange(event) {
    
    this.setState({
      passwordRetyped: event.target.value,
    });
  }

  handleClickRegister = () => {
    this.setState({
      username: '',
      password: '',
      loginOpen: false,
      showRegister: true,
      passwordRetyped: '',

    })
  }

  handleClickCloseLogin = () => {
    this.setState({loginOpen: false,})
  }

  handleCloseUnsuccessful = () => {
    this.setState({showUnsuccessful: false,})
  }

  handleCloseRegister = () => {
    this.setState({showRegister: false,})
  }

  handleClickSubmitLogin = () => {
    this.setState({ loginOpen: false });
    var self = this;
    var apiUrl = 'http://localhost:8080/login/';
    axios.get(apiUrl+this.state.username+'/'+this.state.password).then(function (response) {
      if( response.data !== '') {
        self.setState({
          showLogIn: false,
          showLogOut: true,
          showAccoutOptions: true,
          password: '',
        })

        if( response.data === 'Administrator') {
          self.setState({
            showAdministrator: true,
          })
        }
        else if( response.data === 'Salesman') {
          self.setState({
            showSalesman: true,
          })
        }
        else if( response.data === 'Editor') {
          self.setState({
            showEditor: true,
          })
        }
      }
      else {
        self.setState({alertContent: 'Log in unsuccessful!', showUnsuccessful: true, })
      }

    });

  }

  handleClickSubmitRegister = () => {
    this.setState({ showRegister: false, });
    var self = this;
    var apiUrl = 'http://localhost:8080/register/';

    if( this.state.password === this.state.passwordRetyped) {
      axios.post(apiUrl+this.state.username+'/'+this.state.password).then(function (response) {
        if(response.data === 'Successful') {
          self.setState({passwordRetyped: '',});
          self.handleClickSubmitLogin();
        } else {
          self.handleCloseRegister();
          self.setState({alertContent: 'Registration unsuccessful!', showUnsuccessful: true,});
        }
      });
    } else {
      this.handleCloseRegister();
      this.setState({alertContent: "Passwords don't match!", showUnsuccessful: true,});
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Toolbar className="toolbar">
            <Button component={Link} to="/" variant="outlined" size="small">
              Home
            </Button>
            <Typography variant="title" align="center" noWrap className="title">MovieBook</Typography>
            { this.state.showLogIn ? <Button variant="outlined" size="small" onClick={ this.handleClickOpenLogin }>Log in</Button> : null}
            { this.state.showLogOut ? <Button variant="outlined" size="small" onClick={this.handleClickLogOut}>Log out</Button> : null}
          </Toolbar>      
          <Toolbar variant="dense">
            <Button size="small" component={Link} to="/films">films</Button>
            <Button size="small" component={Link} to="/actors">actors</Button>
            {this.state.showAccoutOptions ? <Button size="small" component={Link} to="/account">account</Button> : null}
            {this.state.showAdministrator ? <Button size="small" component={Link} to="/adminTools">tools</Button> : null}
            {this.state.showSalesman ? <Button size="small" component={Link} to="/salesmanTools">tools</Button> : null}
            {this.state.showEditor ? <Button size="small" component={Link} to="/editorTools">tools</Button> : null}
          </Toolbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/actors" component={Actors} />
          <Route exact path="/films/:title" component={Movie}></Route>
          <Route exact path="/films" component={MovieList} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/adminTools" component={AdminTools} />
          <Route exact path="/salesmanTools" component={SalesmanTools} />
          <Route exact path="/editorTools" component={EditorTools} />

          <Dialog
            open = {this.state.loginOpen}
            onClose={this.handleClickCloseLogin}
            aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-name"
              label="Username"
              onChange = {this.handleUsernameChange.bind(this)}
              value = {this.state.username}
            />
            <br/><br/>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              onChange = {this.handlePasswordChange.bind(this)}
              value = {this.state.password}
            />
            <br/><br/><br/>
            <Button variant="outlined" onClick={this.handleClickSubmitLogin} size="small">Submit</Button>
            <Button variant="outlined" onClick={this.handleClickRegister} size="small">Register</Button>
          </DialogContent>
          </Dialog> 
          
          <Dialog
            open = {this.state.showRegister}
            onClose={this.handleCloseRegister}
            aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-name"
              label="Username"
              onChange = {this.handleUsernameChange.bind(this)}
              value = {this.state.username}
            />
            <br/><br/>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              onChange = {this.handlePasswordChange.bind(this)}
              value = {this.state.password}
            />
            <br/><br/>
            <TextField
              id="standard-password-input"
              label="Retype Password"
              type="password"
              onChange = {this.handlePasswordRetypedChange.bind(this)}
              value = {this.state.passwordRetyped}
            />
            <br/><br/><br/>
            <Button variant="outlined" onClick={this.handleClickSubmitRegister} size="small">Submit</Button>
          </DialogContent>
          </Dialog> 

          <Dialog
            open={this.state.showUnsuccessful}
            onClose={this.handleCloseUnsuccessful}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Error</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.alertContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseUnsuccessful}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        </div>
      </Router>
    );
  }
}

export default App;