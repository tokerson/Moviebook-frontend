import React, {Component} from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
const URL = 'http://localhost:8080';



class IssueDialog extends Component {

    constructor(props){
        super(props);
        this.state = {
            issue: ""
        }
    }

    sendIssue = () => {
        axios.post(`${URL}/addIssue/${this.props.idMovie}/${this.props.username}/${this.state.issue}`)
             .then( response => {
                 if( response.data === "Successful") {
                     this.props.onClose();
                 }
             })
    }
    render(){
        return(
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose}> 
                <DialogTitle>Let us know about our mistakes</DialogTitle>
                    <DialogContent>
                    <form>
                        <TextField value={this.state.issue} onChange={(event)=>this.setState({issue:event.target.value})} label="Give us your thoughts" margin="normal" multiline={true} variant="outlined" style={{width:"100%"}}/>
                        <Button disabled={this.state.issue === ""} onClick={this.sendIssue} size="medium" style={{background:"#dfdedeb6",border:"groove", borderRadius:"3px"}}>Send your issue</Button>
                    </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default IssueDialog