import React from 'react';
var FontAwesome = require('react-fontawesome');
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import './Navigation.scss';

var logOutFunction = () => {
    this.props.logOut();
}

class Navigation extends React.Component {
    render() {
        return(
            <div>
                <Navbar>
                    <NavbarBrand href="#">TvApp</NavbarBrand>
                        <Button
                            outline color="secondary"
                            onClick={this.logOutFunction}
                            id="logout"
                            className="">
                            <FontAwesome name="sign-out"/> Log Out
                        </Button>

                </Navbar>

            </div>
        )
    }
}

export default Navigation;
