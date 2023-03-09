
import './LoginScreenCSS.css';
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import firebase from 'firebase/app';


function SignupScreen(props) {

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
    function createAccount(){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                alert("Account created");
                const user = userCredential.user;
                const uid = user.uid
                localStorage.setItem("uid",uid);
                props.setUid(uid);
                const db = getFirestore(app);
                 setDoc(doc(db, uid, "bought"), {
                 }).then( r =>{
                     props.handleLoggingIn();
                 });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error creating account:" + errorCode);
                // ..
            });
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
                <input onChange={handleUsername}  className={"InputField"} placeholder={"Username"}/>
                <input onChange={handlePassword} className={"InputField"} placeholder={"Password"} type={"password"}/>
                <button onClick={createAccount} className={"Button"} >Sign Up</button>
                <text onClick={props.useAccount} className={"SwitchPage"}>Sign In</text>
            </div>
        </div>
    );
}

export default SignupScreen;