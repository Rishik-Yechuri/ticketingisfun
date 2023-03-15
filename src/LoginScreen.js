import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';


import './LoginScreenCSS.css';
function LoginScreen(props) {
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDXselQUENle1wroLiPqMGAEbK7svEWZAY",
        authDomain: "ticketingisfun.firebaseapp.com",
        projectId: "ticketingisfun",
        storageBucket: "ticketingisfun.appspot.com",
        messagingSenderId: "1001052675931",
        appId: "1:1001052675931:web:c8021c0285db0a70cd847e",
        measurementId: "G-EXHXNMV7KM"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    var auth = getAuth();

    function SignInButton() {
        localStorage.setItem("uid",username);
        // localStorage.
        handleSignUpClick(username);
    }
    function handleSignUpClick() {
        props.onLogIn();
    }
    const [username, setUserName] = useState('');

    const handleUsername = (event) => {
        setUserName(event.target.value);
    };
    const [password, setPassword] = useState('');

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    return (
        <div className={"Main"} style={{ visibility: props.visibleState ? 'visible' : 'hidden' }}>
        <div className={"LoginHolder"}>
            <input  onChange={handleUsername} className={"InputField"} placeholder={"Email"}/>
            <button onClick={SignInButton} className={"Button"} >Next</button>
        </div>
        </div>
    );
}

export default LoginScreen;