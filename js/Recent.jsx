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

    componentWillMount(){
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val());
           })
        })

        // console.log(data.length)
        for (var i = 0; i < data.length; i++) {
            console.log(data[i])
        }
    }

    render(){
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val());
           })
        })

        let thumbnails = data.map((item, i) => {
            return (
                <li key={i} id={item.showId}
                    onClick={this.getDetails.bind(this, item.showId)}>
                    <div>
                        <img src={item.picture}/>
                        <h3>{item.showName}</h3>
                    </div>
                </li>
            )
        })

        let recent = this.state.items;
        // console.log(data)
        // let recentList = recent.map((item, i) => {
        //     return (
        //         <li key={i}>
        //             <p>{item} Hello</p>
        //         </li>
        //     )
        // })
        return(
            <section>
                Recent:
                <ul className="list-thumbs">
                    {thumbnails}
                </ul>
            </section>
        );
    }
}

export default Recent;
