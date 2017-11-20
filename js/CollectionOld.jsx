import React from 'react';
import fire from './fire.jsx';


class Item extends React.Component {
    render(){
        return(
            <li>
                <img src={this.props.data.picture.medium} />
                <h2>hello </h2>
            </li>
        );
    }
}
class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: ["1","@","3"]
        };
    }
    getCollection = () =>{
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              items.push(item.val());
              console.log(item.val())
           })
        })
    }
    //
    componentWillMount =() =>{
        this.getCollection();
        console.log(this.state.items)
    }
    componentDidUpdate = () => {
        this.getCollection();
    }
    // componentDidMount = () => {
    //
    // }

    // render(){
    //     const catchCollection = new Promise((resolve, reject) => {
    //         resolve(()=>{
    //                 var thumbnails = this.state.items.map((item, i) => {
    //                     return <Item data={item}></Item>
    //                 })
    //                 return(
    //                     <section>
    //                         Collection:
    //                         <ul>
    //                             {thumbnails}
    //                         </ul>
    //
    //                     </section>
    //                 );
    //             }
    //         )
    //     })
    // }

    render(){
        console.log("Collection: " + this.props.userData)
        let thumbnails = this.state.items.map((item) => {
            return <li >{item.showName}</li>
        })
        console.log(this.state.items)
        return(
            <section>
                Collection:
                <ul>
                    {thumbnails}
                </ul>

            </section>
        );
    }
}

export default Collection;
