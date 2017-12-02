import React from 'react';
import SearchBox from './SearchBox.jsx'
import Collection from './Collection.jsx'
import Recent from './Recent.jsx';
import Popular from './Popular.jsx';
import Upcoming from './Upcoming.jsx';
import News from './News.jsx';
import Credits from './Credits.jsx';

import { Container } from 'reactstrap';
import fire from './fire.jsx';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }

    render(){
        // console.log("Profile: " + this.props.userData)
        return(
            <Container>
                <SearchBox userData={this.props.userData}/>
                <Collection userData={this.props.userData} />
                <Upcoming userData={this.props.userData} data={this.state.data}/>
                <Popular userData={this.props.userData}/>
                {/* <Recent userData={this.props.userData}/>
                <News /> */}
                <Credits/>
            </Container>
        );
    }
}

export default Profile;
