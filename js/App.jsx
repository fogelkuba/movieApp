import React from 'react';
import Navigation from './Navigation.jsx';
import Authen from './Authen.jsx';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './App.scss';


class App extends React.Component {
    render() {
        return(
            <div>
                <Navigation />
                <Authen />
            </div>
        )
    }
}

export default App;
