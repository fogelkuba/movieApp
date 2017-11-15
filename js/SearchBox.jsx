import React from 'react';
import Results from './Results.jsx'

const API = 'https://api.github.com/users';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: 'fogelkuba',
            name: '',
            avatar: '',
            repos: '',
            followers: '',
            following: '',
            homeURL: '',
            notFound: ''
        };
    }

    searchProfile = (username) => {
        let finalURL = `${API}/${username}`;

        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                username: data.login,
                name: data.name,
                avatar: data.avatar_url,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                homeURL: data.html_url,
                notFound: data.message
            })
        })
        .catch( (err) => console.log(err) )
    }

    submitForm = (e) => {
        e.preventDefault();
        let val = this.refs.username.value;
        this.setState({
            val: val
        });
        console.log('Value:' + val);
        this.searchProfile(val);
        //this.refs.username.value = '';

    }

    render(){
        console.log("Upcoming: " + this.props.userData)
        return(
            <div>
                <form onSubmit={this.submitForm}>
                    <label><input type="search" ref="username" placeholder="type username and hit enter" /></label>
                </form>
                <Results results={this.state.val}/>
            </div>
        );
    }
}

export default Search;
