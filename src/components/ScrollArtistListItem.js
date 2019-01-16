import React, { Component }  from 'react';
import '../css/ListItem.css'
import '../css/ScrollListItem.css'

class ScrollArtistListItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            selected:false
        }
    }

    selectItem = () => {
        const selected = !this.state.selected;
        console.log(selected)
        this.setState({
            selected: selected
        })
    }


    render(){
        const classname = this.state.selected ? "scrollListItemSelected" : "scrollListItem";
        return(
            <div key={this.props.artist.id} className={classname} onClick={this.selectItem}>
    
                <div className="scrollListItemAvatar">
                    <img src={this.props.artist.pictureUrl} alt={"picture" + this.props.artist.name + this.props.artist.surname}></img>
                </div>
                <div className="moviePreview">
                    <h2 id="title">{this.props.artist.name} {this.props.artist.surname}</h2>
                </div>
    
            </div>
        );
    }
    
}

export default ScrollArtistListItem;