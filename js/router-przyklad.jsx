import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    Link,
    IndexRoute,
    hashHistory } from 'react-router';

class Template extends React.Component {
    render() {
        return(
            <div>
                <h1>App</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

class Main extends React.Component {
    render() {
        return(
            <div>
                <h1>Witaj na stronie ciulu</h1>
                <img src="http://mofsc.com.au/wp-content/uploads/2016/09/Welcome-02-web-version.jpg"/>
            </div>
    );
    }
}
class About extends React.Component {
    render() {
        return (
            <div>
                <img src="https://2k8r3p1401as2e1q7k14dguu-wpengine.netdna-ssl.com/wp-content/uploads/2015/08/title-about.png"/>
                <li>
                    <Link to="/about/us">About Us</Link>
                </li>
                <li>
                    <Link to="/about/company">About Company</Link>
                </li>

                {this.props.children}


            </div>
        );
    }
}

class AboutUs extends React.Component {
    render() {
        return(
            <div>
                <h1>About Us</h1>;
                <img src="https://cdn.searchenginejournal.com/wp-content/uploads/2015/04/Depositphotos_59977559_m-2015-760x400.jpg"/>
            </div>)
    }
}
class AboutCompany extends React.Component {
    render() {
        return (
        <div>
            <h1>About Company</h1>
            <img src="http://www.optimista.co.in/image/company.png"/>
        </div>
        )
    }
}

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h1>404,Nothing is here</h1>
                <img src="http://szczerbal-mariusz.pl/wp-content/uploads/2017/08/404_artyku%C5%82.png"/>
            </div>
        );

    }
}

class App extends React.Component {
    render() {
        return(
            <Router history={hashHistory}>
                <Route path='/' component={Template}>
                    <IndexRoute component={Main} />
                    <Route path='/about' component={About}>
                        <Route path='us' component={AboutUs} />
                        <Route path='company' component={AboutCompany} />
                    </Route>
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        )

    }
}

ReactDOM.render(<App />, document.getElementById('app'));
