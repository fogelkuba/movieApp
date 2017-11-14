import React from 'react';

class Upcoming extends React.Component {
    render(){
        console.log("Upcoming: " + this.props.userData)
        return(
            <div>
                Upcoming
            </div>
        );
    }
}

export default Upcoming;
