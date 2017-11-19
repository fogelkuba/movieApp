import React from 'react';
import fire from './fire.jsx';

const imgThumbs = [];

class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }
    // TO DO POBIERANIE ID SERIALI -> przekształcanie ich na podlinkowane minatury-> item
    // po kliknieciu pojawia sie widok serialu, tytul, opis daty, lista odcinkow
    getCollection = () =>{
        var data = [];
        fire.database().ref('users/' + this.props.userData.uid + '/shows/')
        .on('value', snap =>  {
           snap.forEach(item => {
              data.push(item.val());
           })
           console.log("data:")
           console.log(data);
           this.setState({
               items: data
           })
       })
    }

    componentWillMount =() =>{
        this.getCollection();
    }
    componentDidUpdate = () => {
        //this.getCollection();
    }
    collectionThumbnails = () => {
        const list = this.state.items;
        console.log("typeof:")
        console.log(typeof list)
        let thumbnails = list.forEach((item) => {
            return <li >{item.showName}</li>
        })
    }

    render(){
        console.log("Collection: " + this.props.userData)

        return(
            <section>
                Collection:
                <ul>
                    {/* {thumbnails} */}
                    {this.collectionThumbnails}
                </ul>

            </section>
        );
    }
}

export default Collection;
