import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Season from './Season.jsx';
import fire from './fire.jsx';

class ModalData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            modalData: '',
            collapse: false,
        };
    }

    shouldComponentUpdate = (nextProps, nextState) =>{
        return nextState.collapse == this.state.collapse
    }

    removeFromCollection = () => {
        fire.database().ref('users/' + this.props.userData.uid + '/shows/'+ this.props.modalData.id).remove();
    }

    render(){
        var seasonList = this.props.seasons;
        let seasons = seasonList.map((item, i) =>{
            return(
                <Season
                    userData={this.props.userData}
                    key={i}
                    item={item}
                    id={this.props.id}/>
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
                    <Button color="primary" onClick={this.removeFromCollection}>Remove</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalData;
