import React from 'react';
import Navigation from './Navigation.jsx';
import Authen from './Authen.jsx';
import Profile from './Profile.jsx'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import fire from './fire.jsx';
import './App.scss';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    checkLogin = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user,
                    logged: true
                })
            }else{
                this.setState({
                    user: null,
                    logged: false
                })
            }
        })
    }
    logout = () =>{
        fire.auth().signOut();

        var lout = document.querySelector('#logout');
        var msg = "Thanks for using our app"
        this.setState({
            msg: msg,
            user: null
        })
        console.log('kliknieto wyloguj');
        lout.classList.add('hide');
        this.props.checklogin();
    };

    render() {
        if (this.state.logged == true) {
            return (
                <div>
                    <Navigation
                        userEmail={this.state.user.email}
                        logOut={this.logout} />
                     <Profile
                        userData={this.state.user} />
                </div>
            )
        }else{
            return(
                <div>
                    <Navigation />
                <Authen checkLogin={this.checkLogin} />
                </div>
            )
        }
    }
}

export default App;
