import React from 'react';
const API = 'http://api.tvmaze.com/';
import fire from './fire.jsx';
const MovieDbApiKey = '15155c67d3284abfee39ffe45d44d7e2';

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount(){

    }
    render(){
        let finalURL = `https://api.themoviedb.org/3/tv/popular?api_key=15155c67d3284abfee39ffe45d44d7e2&language=en-US&page=1`;
        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            var toRender = data.results.map((item, i)=>{
                return (
                    <li key={i}>
                        <h4>{item.name}</h4>
                        <p>{item.popularity}</p>
                        <p>{item.vote_average}</p>
                        <p>{item.first_air_date}</p>
                    </li>
                )})
            this.setState({
                items: toRender
            })
        })
        .catch( (err) => {
            console.log(err);
        })

        var popularList = this.state.items

        return(
            <section>
                Popular:
                <ul className="list-thumbs">
                    {popularList}
                </ul>
            </section>
        );
    }
}

export default Popular;
