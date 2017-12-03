import React from 'react';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';
import './Upcoming.scss';

class Upcoming extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            schedule: [],
            data: [],
            temp: []
        };
    }
    componentWillMount(){
        console.log('updoming will mount')
        let finalURL = `${API}/schedule/full`;
        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                schedule: data,
            })
        })
        .catch( (err) => {
            console.log(err);
            this.setState({
                schedule: {
                    name: 'Sorry :('
                }
            })
        } )

        var dataArr = [];
        var toRender = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .once('value').then(snap => {
            var maps = snap.forEach(item =>{
            dataArr.push(item.val().showId)
            })
        })
        .then( ()=>{
            let scheduleFull = this.state.schedule.map((item, i) =>{
                if ( dataArr.includes(item._embedded.show.id  )) {
                    // console.log(item._embedded.show.name);
                    console.log(item.id);
                    this.state.temp.push(item)
                }
            })
            this.setState({
                data: true
            })
        })
    }
    render(){
        console.log('upcoming render')
        let toRenderMap = this.state.temp.map((item, i)=>{
            return (
                <li key={i}>
                    <h4>{item.airdate}</h4>
                    <br/>
                    <p>{item._embedded.show.name}</p>
                    <p>Name: {item.name}</p>
                </li>
            )
        })
        return(
            <section>
                <h2>Upcoming:</h2>
                <ul className="list-thumbs upcoming">
                    {toRenderMap}
                </ul>
            </section>
        );
    }
}

export default Upcoming;
