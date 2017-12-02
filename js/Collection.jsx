import React from 'react';
import fire from './fire.jsx';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, CardBody, Card } from 'reactstrap';
import './Collection.scss';
import EpisodesList from './EpisodesList.jsx';
import ModalData from './ModalData.jsx';
const API = 'http://api.tvmaze.com/';

class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            modalData: '',
            seasons: [],
            episodes: [],
            modal: false,
            collapse: false,
            id: ''
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
        this.setState({
            id: id
        })
        //fetching general info
        let generalURL = `${API}shows/${id}`;
        fetch(generalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                modalData: data,
            });
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

        //fetching seasons
        let seasonURL = `${API}shows/${id}/seasons`;
        fetch(seasonURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                seasons: data
            });
        })
        .catch( (err) => {
            console.log(err);
            this.setState({
                modalData: {
                    seasons: 'Sorry no seasons were found :('

                }
            })
        } )
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
                    <div className="thumbnails">
                        <img src={item.picture}/>
                        <h3>{item.showName}</h3>
                    </div>
                </li>
            )
        })

        return(
            <section>
                <h2>Your Collection:</h2>
                <ul className="list-thumbs">
                    {thumbnails}
                </ul>

                <ModalData
                    userData={this.props.userData}
                    modalData={this.state.modalData}
                    seasons={this.state.seasons}
                    id={this.state.id}
                    toggle={this.toggle}
                    modal={this.state.modal} />
            </section>
        );
    }
}
export default Collection;
