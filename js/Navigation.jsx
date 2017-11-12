import React from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Navigation.scss';


class Navigation extends React.Component {
    render() {
        return(
            <div>
                <Navbar>
                    <NavbarBrand href="#">TvApp</NavbarBrand>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
