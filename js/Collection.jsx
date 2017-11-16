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
