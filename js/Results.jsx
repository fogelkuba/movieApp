import React from 'react';

class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        console.log(this.state)
        return(
            <div>
                {this.props.results}
            </div>
        );
    }
}
export default Results;
