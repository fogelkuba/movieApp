import React from 'react';
import fire from './fire.jsx';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Collection.scss';

class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            modal: false
        };
    }

    getCollection = () =>{
        var data = [];
        this.setState({
            items: []
        })
        console.log('data1:')
        console.log(data)

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
       console.log('data2')
       console.log(data)
    }

    componentWillMount =() =>{
        this.setState({
            items: []
        })
        this.getCollection();
    }

    toggle = () => {
        console.log('otwieram')
        this.setState({
            modal: !this.state.modal
        });
    }

    getDetails = (id ,detail) => {
        console.log(id);
        this.toggle();
    }

    render(){
        console.log('render')
        let thumbData = [];
        console.log('thumbData1:')
        console.log(thumbData)
        thumbData = this.state.items
        console.log('thumbData2:')
        console.log(thumbData)



        let thumbnails = thumbData.map((item, i) => {
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

        console.log('================================|')
        return(
            <section>
                Your Collection:
                <ul>
                    {thumbnails}
                </ul>
            </section>

        );
    }
}
export default Collection;
