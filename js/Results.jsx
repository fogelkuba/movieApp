import React from 'react';
import {Button } from 'reactstrap';

class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    addToCollection = () => {
    //TO DO dodac wyszukany serial do kolekcji seriali
    console.log('123')
    }
    render(){
        //console.log(this.state)
        return(
            <div>
                Search:
                <h2>{this.props.name}</h2>
                <p>{this.props.summary}</p>
                <img src={this.props.avatar}/>
            {/* <Button onClick={this.addToCollection}>Add</Button> */}
            </div>
        );
    }
}
export default Results;
