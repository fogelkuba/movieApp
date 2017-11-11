import React from 'react';
var firebase = require('firebase');

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
            err: ''
        };
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
        this.google = this.google.bind(this);
    }
    login(e){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);

        promise.then(user=>{
            var lout = document.querySelector('#logout');
            var err = "Hello again " + user.email;
            this.setState({
                err: err
            })
            lout.classList.remove('hide')
        })

        promise.catch(e=>{
            var err = e.message;
            console.log(err);
            this.setState({
                err: err
            })
        })
    }
    signup(){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise
        .then(user =>{
            var err = "Welcome " + user.email;
            firebase.database().ref('users/' + user.uid).set({
                email: user.email
            });
            console.log(user);
            this.setState({
                err: err
            })
        })
        .catch(e=>{
            var err = e.message;
            console.log(err);
            this.setState({
                err: err
            })
        })
    }
    logout(){
        firebase.auth().signOut();

        var lout = document.querySelector('#logout');
        var msg = "Thanks for using our app"
        this.setState({
            err: msg
        })
        lout.classList.add('hide')
    }
    google(){
        console.log('google login method');
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
    //moze byc redirect zamiast popup
    }
    render(){
        return(
            <div>
                <input id="email" type="email" ref="email" placeholder="enter your email"></input><br/>
                <input id="pass" type="password" ref="password" placeholder="enter your password"></input><br/>
                <p>{this.state.err}</p>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signup}>Sing Up</button>
                <button onClick={this.logout} id="logout" className="hide">Log Out</button><br/>
                <button onClick={this.google} id="google">Log In With Google</button>
        </div>
        );
    }
}

export default Authen;
