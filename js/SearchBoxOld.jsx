import React from 'react';
import Results from './Results.jsx'
import { Row, Col} from 'reactstrap';
import './SearchBox.scss';
const API = 'http://api.tvmaze.com/';
const MovieDbApiKey = '15155c67d3284abfee39ffe45d44d7e2';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            queryType: 'shows',
            show: {
                image:{
                    medium: ''
                }
            },
            val: ''
        };
    }

    searchQuery = (query) => {
        let finalURL;
        if (this.state.queryType == 'person') {
            // finalURL = `${API}/people?q=${query}`;
            finalURL = `https://api.themoviedb.org/3/search/person?api_key=${MovieDbApiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
            fetch(finalURL)
            .then( (res) => res.json() )
            .then( (data) => {
                this.setState({
                    show: data
                })
            })
            .catch( (err) => {
                console.log(err);
                this.setState({
                    show: {
                        name: 'Sorry :('
                    }
                })
            })
        }else{
            finalURL = `${API}singlesearch/shows?q=${query}`;
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
            })
        }
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
    // setSearch = (e) => {
    //     console.log(e.target.value)
    //     this.setState({
    //         queryType: e.target.value
    //     })
    // }
    clear = (e) => {
        e.preventDefault();
        this.setState({
            queryType: 'shows',
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
            result = <Results userData={this.props.userData} show={this.state.show} clear={this.clear} query={this.state.queryType}/>
        }else{
            result = '';
        }
        return(
            <section className="search">
                <h2>Search:</h2>
                
                <Row>
                    <Col md="12">
                        <form onSubmit={this.submitForm}>
                            <label><input type="search" ref="query" placeholder="type show name and hit enter" /></label>
                        </form>
                    </Col>
                    {/* <Col md="3">
                        <select name='select' defaultValue="shows" value={this.state.value} onChange={this.setSearch}>
                            <option value='shows' >Shows</option>
                            <option value='person'>Person</option>
                        </select>
                    </Col> */}
                </Row>
                {result}
        </section>
        );
    }
}

export default Search;
