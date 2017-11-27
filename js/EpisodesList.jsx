import React from 'react';
import { Button, Collapse, CardBody, Card} from 'reactstrap';
import ListItem from './ListItem.jsx';
import fire from './fire.jsx';

class EpisodesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            episodes: []
        };
    }
    toggle = () => {
        this.setState(
            { collapse: !this.state.collapse }
        );
    }
    shouldComponentUpdate = (nextProps, nextState) =>{
        return nextState.collapse == this.state.collapse
    }

    render(){
        var episodesList = this.props.episodes;
        let episodes = episodesList.map((item, i) => {
            return (
                <ListItem
                    userData={this.props.userData}
                    key={i}
                    item={item}
                    id={this.props.id}
                    watched={this.props.watched}/>
            )
        })

        return(
            <div>
                {episodes}
            </div>
        );
    }
}

export default EpisodesList;
