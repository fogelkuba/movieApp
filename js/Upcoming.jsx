import React from 'react';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';

class Upcoming extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
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

    render(){
        // console.log("Upcoming: " + this.props.userData)
        return(
            <section>
                Upcoming:
                <ul className="list-thumbs">

                </ul>
            </section>
        );
    }
}

export default Upcoming;
