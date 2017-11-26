import React from 'react';
import {Button, Collapse, CardBody, Card } from 'reactstrap';
import EpisodesList from './EpisodesList.jsx';
const API = 'http://api.tvmaze.com/';

class Season extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            episodes: []
        };
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    componentWillUpdate(){
        let seasonEpisodesURL = `${API}seasons/${this.props.item.id}/episodes`;
        fetch(seasonEpisodesURL)
        .then( (results) => results.json() )
        .then( (data) => {
            if (this.refs.reference) {
                this.setState({
                    episodes: data
                })
            }
        })
        .catch ( (error) => {
            this.setState({
                episodes: {
                    name: 'Sorry Again:(',
                    summary: 'No episodes were found'
                }
            })
            console.log(error)
        })
    }

    render(){
        return(
            <ul ref="reference">
                <Button onClick={this.toggle}>Season: {this.props.item.number}</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <EpisodesList
                                    episodes={this.state.episodes}
                                    userData={this.props.userData}
                                    item={this.props.item}
                                    id={this.props.id}/>
                            </CardBody>
                        </Card>
                    </Collapse>
            </ul>

        );
    }
}

export default Season;
