import React from 'react';
import fire from './fire.jsx';

class Collection extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    // TO DO POBIERANIE ID SERIALI -> przekształcanie ich na podlinkowane minatury-> item
    // po kliknieciu pojawia sie widok serialu, tytul, opis daty, lista odcinkow
    getCollection = () =>{
        fire.database().ref('users/' + this.props.userData.uid + '/shows/').on('value', snap => console.log(snap.val()));
    }

    componentDidMount =() =>{
        this.getCollection();
        console.log('123')
    }
    componentDidUpdate = () => {
        this.getCollection();
        console.log('123')
    }

    render(){
        console.log("Collection: " + this.props.userData)
        return(
            <div>
                Collection
            </div>
        );
    }
}

export default Collection;
