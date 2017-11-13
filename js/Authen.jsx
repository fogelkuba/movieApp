import React from 'react';
var firebase = require('firebase');
var FontAwesome = require('react-fontawesome');
import { Button, Alert, Input, Container, Row, Col } from 'reactstrap';
import './Authen.scss';

var config = {
    apiKey: "AIzaSyAoH8Bz5lqTNConqTWnWbDwLafQC3G-RqU",
    authDomain: "tvapp-33fc3.firebaseapp.com",
    databaseURL: "https://tvapp-33fc3.firebaseio.com",
    projectId: "tvapp-33fc3",
    storageBucket: "tvapp-33fc3.appspot.com",
    messagingSenderId: "662339811745"
};
firebase.initializeApp(config);

class Authen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            msg: ''
        }
    };
    login =(e) => {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);

        promise.then(user => {
            var lout = document.querySelector('#logout');
            var msg = "Hello again " + user.email;
            this.setState({
                msg: msg,
                user: user
            })
            lout.classList.remove('hide')
        })
        promise.catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({
                msg: err
            })
        })
    };
    signup = () => {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise
        .then(user =>{
            var msg = "Welcome " + user.email;
            firebase.database().ref('users/' + user.uid).set({
                email: user.email
            });
            console.log(user);
            this.setState({
                msg: msg
            })
        })
        .catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({
                err: err
            })
        })
    };
    logout = () =>{
        firebase.auth().signOut();

        var lout = document.querySelector('#logout');
        var msg = "Thanks for using our app"
        this.setState({
            msg: msg,
            user: null
        })
        lout.classList.add('hide');

    };
    google = () =>{
        console.log('google singin method');
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provider);

        promise.then(result=>{
            var user = result.user;
            firebase.database().ref('users/'+user.uid).set({
                email: user.email,
                name: user.displayName
            })
        })
        .catch(e=>{
            var msg = e.message;
            console.log(msg);
        })
    };

    componentDidMount(){
        this.props.checkLogin();
    }

    componentDidUpdated(){
        this.props.checkLogin();
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col md={{size:4, offset:3}}>
                        <input
                            id="email"
                            type="email"
                            ref="email"
                            placeholder="enter your email">
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col md={{size:4, offset:1}}>
                        <input
                            id="pass"
                            type="password"
                            ref="password"
                            placeholder="enter your password">
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <Alert color="secondary">{this.state.msg}</Alert>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <Button
                            outline color="secondary"
                            onClick={this.login}>
                            <FontAwesome name="user-o"/> Log In
                        </Button>
                        <Button
                            outline color="secondary"
                            onClick={this.signup}>
                            <FontAwesome name="sign-in"/> Sing Up
                        </Button>
                        <Button
                            outline color="secondary"
                            onClick={this.logout}
                            id="logout"
                            className="">
                            <FontAwesome name="sign-out"/> Log Out
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <Button
                            outline color="danger"
                            onClick={this.google}
                            id="google">
                            <FontAwesome name="google"/> Sign In With Google
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Authen;