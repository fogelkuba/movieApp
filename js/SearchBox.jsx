import React from 'react';
import Results from './Results.jsx'

const API = 'http://api.tvmaze.com/singlesearch/shows?q=';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            avatar: '',
            rating: '',
            summary: '',
            notFound: ''
        };
    }

    searchProfile = (query) => {
        let finalURL = `${API}/${query}`;

        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                name: data.name,
                avatar: data.image.medium,
                rating: data.rating.average,
                summary: data.summary,
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
        this.refs.username.value = '';
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
