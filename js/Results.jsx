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
    //TO DO dodac wyszukany serial do kolekcji seriali
        fire.database().ref('users/' + this.props.userData.uid + '/shows/'+this.props.show.id).set({
                showId: this.props.show.id,
                showName: this.props.show.name
        })
        console.log('dodano do firebase: ' + this.props.show.id + ' ' + this.props.show.name);
    }
    componentDidUpdate(){
        if (this.props.show.summary == null) {
            this.state.summ = ' ';
        }else{
            this.state.summ = this.props.show.summary;
        }
    }
    render(){
        let summary = this.state.summ;
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
