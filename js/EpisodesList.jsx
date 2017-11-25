import React from 'react';
import fire from './fire.jsx';
import { Button, Collapse, CardBody, Card} from 'reactstrap';
const API = 'http://api.tvmaze.com/';
import ListItem from './ListItem.jsx';

class EpisodesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            episodes: []
        };
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    render(){
        let seasonEpisodesURL = `${API}seasons/${this.props.item.id}/episodes`;
        fetch(seasonEpisodesURL)
        .then( (results) => results.json() )
        .then( (data) => {
            this.setState({
                episodes: data
            })
        })
        .catch ( (error) => {
            this.setState({
                episodes: {
                    name: 'Sorry Again:(',
                    summary: 'No episodes were found'
                }
            })
        })

        var episodesList = this.state.episodes;
        let episodes = episodesList.map((item, i) => {
            return (
                <ListItem key={i} item={item}/>
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
