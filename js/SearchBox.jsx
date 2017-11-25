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
    setSearch = (e) => {
        setState({
            searchType: e.target.value
        })
    }
    clear = (e) => {
        e.preventDefault();
        this.setState({
            queryType: '',
            show: {
                image:{
                    medium: ''
                }
            },
            val: ''
        })
    }
    render(){
        var result;
        if (this.state.val !== '') {
            console.log('val: true')
            result = <Results userData={this.props.userData} show={this.state.show} clear={this.clear}/>
        }else{
            result = '';
        }
        return(
            <section className="search">
                Search:
                <form onSubmit={this.submitForm}>
                    <label><input type="search" ref="query" placeholder="type username and hit enter" /></label>
                </form>
                <select name='select' defaultValue="shows" onChange={this.setSearch}>
                    <option value='shows' >Shows</option>
                    <option value='genre'>Genre</option>
                    <option value='person'>Person</option>
                </select>
                {result}
        </section>
        );
    }
}

export default Search;
