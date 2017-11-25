import React from 'react';
import fire from './fire.jsx';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse, CardBody, Card } from 'reactstrap';
import './Collection.scss';
import EpisodesList from './EpisodesList.jsx';

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
            collapse: false
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
    toggleCollapse = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    getDetails = (id ,detail) => {
        console.log(id);

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
                    <div>
                        <img src={item.picture}/>
                        <h3>{item.showName}</h3>
                    </div>
                </li>
            )
        })

        var seasonList = this.state.seasons;
        let seasons = seasonList.map((item, i) =>{
            return(
                <ul key={i}>
                    <Button onClick={this.toggleCollapse}> Season: {item.number}</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <EpisodesList item={item}/>
                            </CardBody>
                        </Card>
                    </Collapse>
                </ul>
            )
        })

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
                        <div dangerouslySetInnerHTML={{__html: this.state.modalData.summary}}></div>
                        <ul>
                            {seasons}
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
