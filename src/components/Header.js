import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/App.css';
import { connect } from 'react-redux';


import LoginContainer from '../containers/LoginContainer'

class Header extends Component {

    render(){
        const login = this.props.login;
        return(
        <div>
            <Toolbar className="toolbar">
                <Button component={Link} to="/" variant="outlined" size="small">
                Home
                </Button>
                <Typography variant="title" align="center" noWrap className="title">MovieBook</Typography>
                <LoginContainer />
            </Toolbar>      
            <Toolbar variant="dense">
                <Button size="small" component={Link} to="/films">films</Button>
                <Button size="small" component={Link} to="/artists">artists</Button>
                <Button size="small" component={Link} to="/cinemas">cinemas</Button>
                <Button size="small" component={Link} to="/tvprograms">tv programs</Button>
                {
                    login.status !== "User" && login.status !== "" ?  
                    <Button size="small" component={Link} to="/addMovie">Add Movie</Button> : null
                }
            </Toolbar>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(Header);