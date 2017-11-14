import React from 'react';
var FontAwesome = require('react-fontawesome');
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import './Navigation.scss';



class Navigation extends React.Component {
    componentDidUpdate = () =>{
        // console.log('nav: ' + this.props.userEmail)
    }
    render() {
        let helloMsg = '';
        const mail = this.props.userEmail;
        if( typeof(mail) === 'undefined'){
            helloMsg = ''
        }else{
            helloMsg =`Hello ${this.props.userEmail} `
        }
        return(
            <div>
                <Navbar>
                    <NavbarBrand href="#">TvApp</NavbarBrand>
                    <NavItem>
                        {helloMsg}
                    </NavItem>
                    <Button
                        outline color="secondary"
                        onClick={this.props.logOut}
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
