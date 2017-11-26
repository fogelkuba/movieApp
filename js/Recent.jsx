import React from 'react';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';

class Recent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    render(){
        // console.log("Upcoming: " + this.props.userData)
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val());
           })
        })

        let recentList = data.map((item, i) =>{
            return (
                <li key={i}>
                    <p>{item.showName} {i}</p>
                </li>
            )
        })
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
