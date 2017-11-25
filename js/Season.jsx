import React from 'react';
import fire from './fire.jsx';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, CardBody, Card } from 'reactstrap';
const API = 'http://api.tvmaze.com/';
import EpisodesList from './EpisodesList.jsx';

class Season extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
        };
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render(){
        return(
            <ul>
                <Button onClick={this.toggle}>Season: {this.props.item.number}</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <EpisodesList item={this.props.item}/>
                            </CardBody>
                        </Card>
                    </Collapse>
            </ul>

        );
    }
}

export default Season;
