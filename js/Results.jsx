import React from 'react';
import {Button, Row, Col} from 'reactstrap';
import fire from './fire.jsx';
import './Results.scss';

class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summ: ''
        };
    }

    addToCollection = () => {
        fire.database().ref('users/' + this.props.userData.uid + '/shows/' + this.props.show.id)
        .on('value', snap => {
            var data = snap.val()
            if (data !== null) {
                console.log('juz dodano')
            }else{
                fire.database().ref('users/' + this.props.userData.uid + '/shows/'+ this.props.show.id).set({
                        showId: this.props.show.id,
                        showName: this.props.show.name,
                        picture: this.props.show.image.medium
                })
                console.log('Added to Firebase: ' + this.props.show.id + ' ' + this.props.show.name);
            }
        });
    }
    removeFromCollection = () => {
        fire.database().ref('users/' + this.props.userData.uid + '/shows/'+ this.props.show.id).remove();
    }

    componentDidUpdate(){
        if (this.props.show.summary == null) {
            this.state.summ = ' ';
        }else{
            this.state.summ = this.props.show.summary;
        }
    }

    render(){
        return(
            <Row>
                <Col sm="12" md="4" lg="3">
                    <img src={this.props.show.image.medium}/>
                </Col>
                <Col>
                    <h2>{this.props.show.name}</h2>
                    <div dangerouslySetInnerHTML={{__html: this.props.show.summary}}></div>
                    <Button className="button-add" onClick={this.addToCollection}>Add</Button>
                    <Button className="button-remove" onClick={this.removeFromCollection}>Remove</Button>
                    <Button className="button-clear" onClick={this.props.clear}>Clear Search</Button>
                </Col>



            </Row>
        );
    }
}
export default Results;
