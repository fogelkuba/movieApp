import React from 'react';

class Recent extends React.Component {
    render(){
        console.log("Recent: " + this.props.userData)
        return(
            <div>
                Recent
            </div>
        );
    }
}

export default Recent;
