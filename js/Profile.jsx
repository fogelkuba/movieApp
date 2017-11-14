import React from 'react';
import Search from './Search.jsx'
import Recent from './Recent.jsx';
import Upcoming from './Upcoming.jsx';
import News from './News.jsx';

class Profile extends React.Component {
    render(){
        console.log("Profile: " + this.props.userData)
        return(
            <div>
                Logged user profile.
                <Search />
                <Recent />
                <Upcoming />
                <News />
            </div>
        );
    }
}

export default Profile;
