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
import {getFirestore} from "firebase/firestore";
import EndPage from "./EndPage";

function App() {

    const [logIn, setLogIn] = useState(false);
    const [ticketIn, setTicketIn] = useState(false);


    function handleLoggingIn(uid) {
        setUid(uid);
        setLoginVisible(false);
        setTicketIn(true);
    }
    function goCheckout(){
        setCheckoutVisible(true);
        setTicketIn(false);
    }
    function goToEnd(){
        setCheckoutVisible(false);
        setEndVisible(true);
    }
    function leaveCheckout(){
        setCheckoutVisible(false);
        setTicketIn(true);
    }

    const [loginVisible, setLoginVisible] = useState(true);
    const [timesCalled, setTimesCalled] = useState(0);
    const [uid, setUid] = useState(0);
    const [checkoutVisible, setCheckoutVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);

    /*  const firebaseConfig = {
          apiKey: "AIzaSyDXselQUENle1wroLiPqMGAEbK7svEWZAY",
          authDomain: "ticketingisfun.firebaseapp.com",
          projectId: "ticketingisfun",
          storageBucket: "ticketingisfun.appspot.com",
          messagingSenderId: "1001052675931",
          appId: "1:1001052675931:web:c8021c0285db0a70cd847e",
          measurementId: "G-EXHXNMV7KM"
      };*/




    return (
        <div className={"Main"}>
            {loginVisible && ( <LoginScreen visibleState={loginVisible}
                         onLogIn={handleLoggingIn}></LoginScreen>)}
            {ticketIn && ( <TicketScreen ticketIn={ticketIn} goCheckout={goCheckout} setCheckoutVisible={setCheckoutVisible}
                          setTimeCalled={setTimesCalled} uid={uid} loggedIn={logIn}
                          timeCalled={timesCalled}></TicketScreen>)}
            {checkoutVisible && ( <Checkout visible={checkoutVisible} goToEnd={goToEnd} leaveCheckout={leaveCheckout}></Checkout>)}
            {endVisible && (<EndPage></EndPage>)}
        </div>
    );
}

export default App;