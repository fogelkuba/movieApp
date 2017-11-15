import React from 'react';
import SearchBox from './SearchBox.jsx'
import Recent from './Recent.jsx';
import Upcoming from './Upcoming.jsx';
import News from './News.jsx';

class Profile extends React.Component {
    render(){
        console.log("Profile: " + this.props.userData)
        return(
            <div>
                Logged user profile.

                <SearchBox />
                <Recent />
                <Upcoming />
                <News />
            </div>
        );
    }
}

export default Profile;
