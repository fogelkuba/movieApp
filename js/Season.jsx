import React from 'react';
import {Button, Collapse, CardBody, Card } from 'reactstrap';
import EpisodesList from './EpisodesList.jsx';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';

class Season extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            episodes: [],
            watched: []
        };
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    shouldComponentUpdate = (nextProps, nextState) =>{
        return nextState.collapse == this.state.collapse && nextState.watched == this.state.watched
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
    componentDidMount(){
        fire.database().ref('users/' + this.props.userData.uid + '/shows/' + this.props.id +'/watched/')
        .once('value', snap => {
            this.setState({
                watched: snap.val()
            });
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
                                    id={this.props.id}
                                    watched={this.state.watched}
                                />

                            </CardBody>
                        </Card>
                    </Collapse>
            </ul>

        );
    }
}

export default Season;
