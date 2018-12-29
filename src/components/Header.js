import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/App.css';

import LoginContainer from '../containers/LoginContainer'

class Header extends Component {

    render(){
        return(
        <div>
            <Toolbar className="toolbar">
                <Button component={Link} to="/" variant="outlined" size="small">
                Home
                </Button>
                <Typography variant="title" align="center" noWrap className="title">MovieBook</Typography>
                <LoginContainer />
                {/* { this.state.showLogIn ? <Button variant="outlined" size="small" onClick={ this.handleClickOpenLogin }>Log in</Button> : null}
                { this.state.showLogOut ? <Button variant="outlined" size="small" onClick={this.handleClickLogOut}>Log out</Button> : null} */}
            </Toolbar>      
            <Toolbar variant="dense">
                <Button size="small" component={Link} to="/films">films</Button>
                <Button size="small" component={Link} to="/actors">actors</Button>
                {/* {this.state.showAccoutOptions ? <Button size="small" component={Link} to="/account">account</Button> : null}
                {this.state.showAdministrator ? <Button size="small" component={Link} to="/adminTools">tools</Button> : null}
                {this.state.showSalesman ? <Button size="small" component={Link} to="/salesmanTools">tools</Button> : null}
                {this.state.showEditor ? <Button size="small" component={Link} to="/editorTools">tools</Button> : null} */}
            </Toolbar>
        </div>
        );
    }
}

export default Header;