import React from 'react';
import fire from './fire.jsx';
import {Button} from 'reactstrap';
import './Popular.scss';

const API = 'http://api.tvmaze.com/';
const MovieDbApiKey = '15155c67d3284abfee39ffe45d44d7e2';

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            page: 1
        };
    }
    prevList = () => {
        let number = this.state.page;
        if (number > 1) {
            number--;
            this.setState({
                page: number
            })
        }
    }
    nextList = () => {
        let number = this.state.page;
        number++;
        this.setState({
            page: number
        })
    }
    searchFromPopular = (e) => {
        console.log(e.currentTarget.dataset.name);
        this.props.setSearch(e.currentTarget.dataset.name);
    }

    render(){
        let finalURL = `https://api.themoviedb.org/3/tv/popular?api_key=15155c67d3284abfee39ffe45d44d7e2&language=en-US&page=${this.state.page}`;
        fetch(finalURL)
        .then( (res) => res.json() )
        .then( (data) => {
            var toRender = data.results.map((item, i)=>{
                let img = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                return (
                    <li key={i} data-name={item.name} onClick={this.searchFromPopular}>
                        <div className="thumbnails">
                            <img src={img}/>
                            <h3>{item.name}</h3>
                            <div className="popular-info">
                                <p>Popularity: {item.popularity}</p>
                                <p>First air: {item.first_air_date}</p>
                                Rating:<span className="rating">{item.vote_average}</span>
                            </div>
                        </div>
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
                <h2>Popular:</h2>
                <ul className="list-thumbs popular">
                    {popularList}
                </ul>
                <div className="popular-navigation">
                    <Button onClick={this.prevList}>Prev</Button>
                    <span>{this.state.page}</span>
                    <Button onClick={this.nextList}>Next</Button>
                </div>
            </section>
        );
    }
}

export default Popular;
