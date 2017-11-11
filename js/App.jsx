import React from 'react';
import Authen from './Authen.jsx';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './App.scss';


class App extends React.Component {
    render() {
        return(
            <div>
                <Navbar>
                    <NavbarBrand href="#">TvApp</NavbarBrand>
                </Navbar>

                <Authen />
            </div>
        )
    }
}

export default App;
