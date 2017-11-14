import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAoH8Bz5lqTNConqTWnWbDwLafQC3G-RqU",
    authDomain: "tvapp-33fc3.firebaseapp.com",
    databaseURL: "https://tvapp-33fc3.firebaseio.com",
    projectId: "tvapp-33fc3",
    storageBucket: "tvapp-33fc3.appspot.com",
    messagingSenderId: "662339811745"
};
var fire =  firebase.initializeApp(config);

export default fire;
