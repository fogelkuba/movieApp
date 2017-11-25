import React from 'react';
import fire from './fire.jsx';
import { Button, Collapse, CardBody, Card} from 'reactstrap';
const API = 'http://api.tvmaze.com/';

class ModalData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            modalData: '',
            seasons: [],
            episodes: [],
            modal: false
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.collapse });
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
        var seasonList = this.state.seasons;
        let seasons = seasonList.map((item, i) =>{
            return(
                <ul key={i}>
                    <h2>
                        Season: {item.number}
                    </h2>
                    <EpisodesList item={item}/>
                </ul>
            )
        })

        return(
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
        );
    }
}

export default ModalData;
