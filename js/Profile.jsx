import React from 'react';
import SearchBox from './SearchBox.jsx'
import Collection from './Collection.jsx'
import Recent from './Recent.jsx';
import Upcoming from './Upcoming.jsx';
import News from './News.jsx';
import { Container } from 'reactstrap';


class Profile extends React.Component {
    render(){
        // console.log("Profile: " + this.props.userData)
        return(
            <Container>
                <SearchBox userData={this.props.userData}/>
                <Collection userData={this.props.userData} />
                <Recent userData={this.props.userData}/>
                <Upcoming userData={this.props.userData}/>
                <News />
            </Container>
        );
    }
}

export default Profile;
