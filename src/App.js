import logo from './logo.svg';
import './App.css';
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import LoginScreen from "./LoginScreen";
import {useState} from "react";
import TicketScreen from "./TicketScreen";
import Checkout from "./Checkout";
import {getFunctions, httpsCallable} from "firebase/functions";
import Card from "./CardComponent";

function App() {
    const [logIn, setLogIn] = useState(false);

    function handleLoggingIn(uid) {
        setUid(uid);
        setLogIn(true);
        setLoginVisible(false);
    }

    const [loginVisible, setLoginVisible] = useState(true);
    const [timesCalled, setTimesCalled] = useState(0);
    const [uid, setUid] = useState(0);
    const [checkoutVisible,setCheckoutVisible] = useState(false);


    function createAccount() {
        setLoginVisible(false);
    }
    return (
        <div className={"Main"}>
            <LoginScreen visibleState={loginVisible} createAccount={createAccount}
                         onLogIn={handleLoggingIn}></LoginScreen>
            <TicketScreen checkoutVisible={checkoutVisible} setCheckoutVisible={setCheckoutVisible} setTimeCalled = {setTimesCalled} uid = {uid} loggedIn={logIn} timeCalled={timesCalled}></TicketScreen>
            <Checkout visible={checkoutVisible}></Checkout>
        </div>
    );
}

export default App;