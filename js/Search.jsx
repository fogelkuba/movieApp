import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };

    }
    componentDidUpdate(){

    }
    componentDidMount(){
        console.log('didMount')
    }
    render(){
        console.log("Upcoming: " + this.props.userData)
        return(
            <div>
                Search: <input ref='search'/>
            </div>
        );
    }
}

export default Search;
