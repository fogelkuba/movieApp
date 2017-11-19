import React from 'react';
import {Button } from 'reactstrap';
import fire from './fire.jsx';

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
                        picture: this.props.show.image
                })
                console.log('Added to Firebase: ' + this.props.show.id + ' ' + this.props.show.name);
            }
        });
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
            <div>
                <h2>{this.props.show.name}</h2>
                {/* <div dangerouslySetInnerHTML={{__html: summary}}></div> */}
                <p>{this.props.show.summary}</p>
                <img src={this.props.show.image.medium}/>
                <Button onClick={this.addToCollection}>Add</Button>
            </div>
        );
    }
}
export default Results;
