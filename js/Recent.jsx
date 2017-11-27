import React from 'react';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';

class Recent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: ["1"]
        };
    }
    componentWillMount(){
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val().showId);
           })
        })
        this.setState({
            items: data
        })
    }
    render(){
        console.log(this.state.items);
        let recent = this.state.items;
        let recentList = recent.forEach((item, i) => {
            console.log(i)
            return (
                <li key={i}>
                    <p>{item} Hello</p>
                </li>
            )
        });
        console.log('after');
        return(
            <section>
                Recent:
                <ul className="list-thumbs">
                    {recentList}
                </ul>
            </section>
        );
    }
}

export default Recent;
