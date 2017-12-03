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
            data: [],
            setSearch: ''
        };
    }

    setSearch = (val) =>{
        // this.setState({
        //     setSearch: val
        // })
    }


    render(){
        // console.log("Profile: " + this.props.userData)
        return(
            <Container>
                <Collection userData={this.props.userData} />
                <SearchBox userData={this.props.userData} searchValFromPopular={this.state.setSearch}/>
                <Popular userData={this.props.userData} setSearch={this.setSearch}/>
                {/* <Recent userData={this.props.userData}/>
                <News /> */}
                <Upcoming userData={this.props.userData} data={this.state.data}/>
                <Credits/>
            </Container>
        );
    }
}

export default Profile;
