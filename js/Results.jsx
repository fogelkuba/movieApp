import React from 'react';
import {Button } from 'reactstrap';
import fire from './fire.jsx';

class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    addToCollection = () => {
    //TO DO dodac wyszukany serial do kolekcji seriali
        fire.database().ref('users/' + this.props.userData.uid + '/shows') .push({

                showId: this.props.show.id,
                showName: this.props.show.name

        })
        console.log('dodano do firebase: ' + this.props.show.id + ' ' + this.props.show.name)
    }

    render(){
        return(
            <div>
                <h2>{this.props.show.name}</h2>
                <p>{this.props.show.summary}</p>
                <img src={this.props.show.image.medium}/>
                <Button onClick={this.addToCollection}>Add</Button>
            </div>
        );
    }
}
export default Results;
