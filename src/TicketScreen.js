import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import './TicketScreenCSS.css';
import Card from "./CardComponent";
import {doc, getFirestore, getDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useEffect, useState} from "react";
import {getFunctions, httpsCallable} from "firebase/functions";

//import firebase from 'firebase/app';


function TicketScreen(props) {
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
    const [timesCalled, setTimesCalled] = useState(0);

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const functions = getFunctions();
    const lineStyle = {
        borderBottom: '1px solid #ccc',
        margin: '0em 0',
    };
    const [cards, setCards] = useState([]);

    //cards.push(<Card subtitle={"please"} title={"hi"} />);

    const searchInput = (event) => {
        var searchQuery = document.getElementById("SearchBar").value;

        // Get the value of the input element
        //var textValue = inputElement.value;
        var tempArr = JSON.parse(localStorage.getItem("set"));
        var arr = [];
        for (const key in tempArr) {
            // if(data.hasOwnProperty(key)){
            //alert("key:" + key);
            arr.push(key);
            //}
        }
        //document.getElementById('holdCards').innerHTML = "";
        var first = searchQuery.substring(0, 1);
        var second = searchQuery.substring(1);
        //var searchVal = searchQuery;
        const allCards = [];
        if (searchQuery.length <= 0) {
            for (const key in tempArr) {
                if (tempArr.hasOwnProperty(key)) {
                    first = key.substring(0, 1);
                    //alert("First:" + first);
                    second = key.substring(1);
                    //alert("Second:" + second);
                    const newCard = <Card uid={uid} title={first} subtitle={second}/>;
                    allCards.push(newCard);
                }
                setCards(allCards);
            }
        } else if(searchQuery.length > 1){
            var contains = false;
            if (arr.includes(searchQuery)) {
                contains = true;
            }
            if (contains) {
                // alert("here:");
                const newCard = <Card uid={uid} title={first} subtitle={second}/>;
                allCards.push(newCard);
                // setCards([...cards, newCard]);
                //}
            }
            setCards(allCards);
        }else{
            for (const key in tempArr) {
                if (tempArr.hasOwnProperty(key)) {
                    if (key.startsWith(searchQuery)) {
                        first = key.substring(0, 1);
                        second = key.substring(1);
                        const newCard = <Card uid={uid} title={first} subtitle={second}/>;
                        allCards.push(newCard);
                    }
                }
            }
            setCards(allCards);
        }
    };

    var set = [];
    const db = getFirestore(app);
    var uid;
    useEffect(message => {
        async function pleaseWork() {
            const docRef = doc(db, "gen", "open");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                // var tempObj = JSON.stringify(data);
                //var obj = JSON.parse(tempObj);
                // alert("Document data:" + data);
                //for (const key in data){
                // if(data.hasOwnProperty(key)){
                //alert("key:" + key);
                // set.add(key);
                //}
                //  }
                localStorage.setItem("set", JSON.stringify(data));
            } else {
                // doc.data() will be undefined in this case
                alert("Error getting account info");
            }
        }

        if (localStorage.getItem("uid") != null) {
            uid = localStorage.getItem("uid");
            pleaseWork().then(r => {
                searchInput();
            });
        }
    }, [props.uid, timesCalled]);

    function timesUp() {
        setTimesCalled(timesCalled + 1)
    }
    function goToCheckout(){
        props.setCheckoutVisible(true);
    }
    //var uid;// = localStorage.get("uid");

    // alert("UID:" + uid);


    //const [cards, setCards] = useState(['card1', 'card2', 'card3']);


    /* const cardComponents = [];

     for (let i = 1; i <= 3; i++) {
         const title = `Card ${i}`;
         const subtitle = `Subtitle ${i}`;
         const key = `card-${i}`;

         cardComponents.push(<Card key={key} title={title} subtitle={subtitle}/>);
         if (i != 3) {
             cardComponents.push(<div style={lineStyle}></div>)
         }
     }*/

    return (
        <div className={"Main"}  style={{visibility: props.loggedIn && !props.checkoutVisible ? 'visible' : 'hidden'}}>
            <div id={"holdPng"}>
                <img id={"seatingPng"} src={require('./wpac.jpg')} />
            </div>
            <div className={"stickRight"}>
                <img onClick={goToCheckout} id={"cartPng"} src={require('./cart.png')}  />
            </div>
            <div className={"SideBar"}>
                <input id={"SearchBar"} className={"Search"} onChange={timesUp}/>
                <div id={"holdCards"}>
                    {cards}
                </div>

            </div>
        </div>
);
}

export default TicketScreen;