import React , { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';


class LoginContainer extends Component {
    render(){
        return(
            <div>
                <Button variant="outlined" size="small">Log in</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);