import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import Authen from './authen.jsx'

class App extends React.Component {
    render() {
        return(
            <div>
                TvApp
                <Authen />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
