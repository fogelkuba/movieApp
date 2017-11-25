import React from 'react';
import fire from './fire.jsx';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, CardBody, Card } from 'reactstrap';
const API = 'http://api.tvmaze.com/';
import EpisodesList from './EpisodesList.jsx';
import Season from './Season.jsx';

class ModalData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            modalData: '',
            seasons: [],
            episodes: [],
            collapse: false,
        };
    }

    // toggleCollapse = () => {
    //     this.setState({
    //         collapse: !this.state.collapse
    //     });
    // }

    render(){
        var seasonList = this.props.seasons;
        let seasons = seasonList.map((item, i) =>{
            return(
                <Season key={i} item={item} />
            )
        })
        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.modalData.name}
                </ModalHeader>
                <ModalBody>
                    <p>Status: {this.props.modalData.status}</p>
                    <p>Premiered: {this.props.modalData.premiered}</p>
                    <p>Duration: {this.props.modalData.runtime}min</p>
                    <div dangerouslySetInnerHTML={{__html: this.props.modalData.summary}}></div>
                    <ul>
                        {seasons}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalData;
