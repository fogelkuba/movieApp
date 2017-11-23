import React from 'react';
import fire from './fire.jsx';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './Collection.scss';
const API = 'http://api.tvmaze.com/';
var get = require('lodash');

class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            episodes: [],
            modal: false,
            modalData: ''
        };
    }

    getCollection = () =>{
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val());
           })
           this.setState({
               items: data
           })
       })
       data = [];
    }

    componentWillMount =() =>{
        this.setState({
            items: []
        })
        this.getCollection();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    getDetails = (id ,detail) => {
        console.log(id);
        let finalURL = `${API}shows/${id}`;

        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                modalData: data,
            });
            //doesn't work
            // let network = data.network.name;
        })
        .catch( (err) => {
            console.log(err);
            this.setState({
                modalData: {
                    name: 'Sorry :(',
                    status: 'Something went wrong. Please refresh app'
                }
            })
        } )
        let showURL = `${API}shows/${id}/episodes`;
        fetch(showURL)
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
        this.toggle();
    }

    render(){
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val());
           })
        })

        let thumbnails = data.map((item, i) => {
            return (
                <li key={i} id={item.showId}
                    onClick={this.getDetails.bind(this, item.showId)}>
                    <div>
                        <img src={item.picture}/>
                        <h3>{item.showName}</h3>
                    </div>
                </li>
            )
        })

        console.log(this.state.episodes);
        var episodesList = this.state.episodes;

        let episodes = episodesList.map((item, i) => {
            return (
                <li key={i}>
                    <h4>{item.name}</h4>
                    <span>Season: {item.season} Episode: {item.number}</span>
                    <div dangerouslySetInnerHTML={{__html: item.summary}}></div>
                    <hr />
                </li>

            )
        })
        console.log('episodeslist:'+ episodesList.length)
        return(
            <section>
                Your Collection:
                <ul className="list-thumbs">
                    {thumbnails}
                </ul>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        {this.state.modalData.name}
                    </ModalHeader>
                    <ModalBody>
                        <p>Status: {this.state.modalData.status}</p>
                        <p>Premiered: {this.state.modalData.premiered}</p>
                        <p>Duration: {this.state.modalData.runtime}min</p>
                        <p>Rating: </p>
                        <p>Network: </p>
                        <div dangerouslySetInnerHTML={{__html: this.state.modalData.summary}}></div>
                        <ul>
                            {episodes}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </section>

        );
    }
}
export default Collection;
