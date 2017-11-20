import React from 'react';
import Results from './Results.jsx'

const API = 'http://api.tvmaze.com/';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            queryType: '',
            show: {
                image:{
                    medium: ''
                }
            },
            val: ''
        };
    }

    searchQuery = (query) => {
        let finalURL = `${API}singlesearch/shows?q=${query}`;
        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            this.setState({
                show: data,
            })
        })
        .catch( (err) => {
            console.log(err);
            this.setState({
                show: {
                    name: 'Sorry :('
                }
            })
        } )
    }

    submitForm = (e) => {
        e.preventDefault();
        let val = this.refs.query.value;
        this.setState({
            val: val
        });
        this.searchQuery(val);
        this.refs.query.value = '';
    }

    render(){
        // console.log("SearchBox " + this.props.userData)
        return(
            <section className="search">
                Search:
                <form onSubmit={this.submitForm}>
                    <label><input type="search" ref="query" placeholder="type username and hit enter" /></label>
                </form>
                <select name='select' defaultValue="shows">
                    <option value='shows' >Shows</option>
                    <option value='genre'>Genre</option>
                    <option value='person'>Person</option>
                </select>
                <Results
                    userData={this.props.userData}
                    show={this.state.show}
                />
        </section>
        );
    }
}

export default Search;
