import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useState} from 'react';
import firebase from 'firebase/app';
import {Link} from 'react-router-dom';
import validator from 'validator';


import './LoginScreenCSS.css';
import {getFunctions, httpsCallable} from "firebase/functions";

function LoginScreen(props) {

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//Please please deploy
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDXselQUENle1wroLiPqMGAEbK7svEWZAY",
        authDomain: "ticketingisfun.firebaseapp.com",
        projectId: "ticketingisfun",
        storageBucket: "ticketingisfun.appspot.com",
        messagingSenderId: "1001052675931",
        appId: "1:1001052675931:web:c8021c0285db0a70cd847e",
        measurementId: "G-EXHXNMV7KM",
        functionsEmulatorHost: 'localhost:5001'
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    var auth = getAuth();

    function SignInButton() {
       var splitEmail = username.toLowerCase().split("@")[1].split(".")[1];
       if(!(splitEmail === 'com' || splitEmail === 'net' || splitEmail === 'org' || splitEmail === 'us')){
           alert('Email:' + username + ' might not exist');
       }
        localStorage.setItem("uid", username.toLowerCase());
        localStorage.setItem("name", name);
        //props.visibleState = false;
        // localStorage.
        handleSignUpClick();


    }

    function handleSignUpClick() {
        props.onLogIn();
    }

    const [username, setUserName] = useState('');
    const [name, setName] = useState('');


    const handleUsername = (event) => {
        setUserName(event.target.value);
    };
    const handleName = (event) => {
        setName(event.target.value);
    };

    return (
        <div className={"Main2"} /*style={{ visibility: props.visibleState ? 'visible' : 'hidden' }}*/>
            <div id={"everything"}>
                <div id={"holdPng"}>
                    {/*
                    <img id={"logoPng"} src={require('./kkdslogo.png')}/>
*/}
                    <img id={"eventPng"} src={require('./eventinfo.png')}/>

                    {/*<text className={"titleText"}>Kalamandapam</text>
                    <text className={"subtitleText"}>Proudly Presents</text>
                    <text id={"nirvanam"} className={"titleText"}>Nritya Nirvanam 2023</text>
                    <text className={"eventText"}>Wagner performing arts center | March 26th, seating starts at 3PM | Monroe,WA</text>*/}
                </div>
                <div className={"LoginHolder"}>
                    <form className="LoginHolder" onSubmit={SignInButton}>
                        <input onChange={handleName} className="InputField" placeholder="Full Name" required/>
                        <input onChange={handleUsername} className="InputField"
                               placeholder="Email (Tickets will be sent here)" type="email" required/>
                        <button type="submit" className="Button">Next</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default LoginScreen;
