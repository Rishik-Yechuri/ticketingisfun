import logo from './logo.svg';
import './App.css';
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import LoginScreen from "./LoginScreen";
import {useState} from "react";
import SignupScreen from "./SignupScreen";
import TicketScreen from "./TicketScreen";
import Checkout from "./Checkout";
import {getFunctions, httpsCallable} from "firebase/functions";
import Card from "./CardComponent";

function App() {
    const [logIn, setLogIn] = useState(false);

    function handleLoggingIn(uid) {
        setUid(uid);
        setLogIn(true);
        //setTimesCalled(timesCalled+1);
        //alert("Logged in");
        setSignupVisible(false);
        setLoginVisible(false);
    }

    const [signupVisible, setSignupVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(true);
    const [timesCalled, setTimesCalled] = useState(0);
    const [uid, setUid] = useState(0);
    const [checkoutVisible,setCheckoutVisible] = useState(false);


    function createAccount() {
        setSignupVisible(true);
        setLoginVisible(false);
    }

    function useAccount() {
        setSignupVisible(false);
        setLoginVisible(true);
    }

    return (
        <div className={"Main"}>
            <LoginScreen visibleState={loginVisible} createAccount={createAccount}
                         onLogIn={handleLoggingIn}></LoginScreen>
            <SignupScreen setUid = {setUid} handleLoggingIn={handleLoggingIn} visibleState={signupVisible}
                          useAccount={useAccount}></SignupScreen>
            <TicketScreen checkoutVisible={checkoutVisible} setCheckoutVisible={setCheckoutVisible} setTimeCalled = {setTimesCalled} uid = {uid} loggedIn={logIn} timeCalled={timesCalled}></TicketScreen>
            <Checkout visible={checkoutVisible}></Checkout>
        </div>
    );
}

export default App;