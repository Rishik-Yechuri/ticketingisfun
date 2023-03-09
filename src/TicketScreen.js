import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import './TicketScreenCSS.css';
import Card from "./CardComponent";
import {doc, getFirestore,getDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useEffect, useState} from "react";
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

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const lineStyle = {
        borderBottom: '1px solid #ccc',
        margin: '0em 0',
    };
     const [cards, setCards] = useState([]);

     //cards.push(<Card subtitle={"please"} title={"hi"} />);

     const searchInput = (event) => {
         alert("Search");
         var tempArr = JSON.parse(localStorage.getItem("set"));
         var arr = [];
         for (const key in tempArr){
             // if(data.hasOwnProperty(key)){
             alert("key:" + key);
              arr.push(key);
             //}
         }
         document.getElementById('holdCards').innerHTML = "";
         var first = event.target.value.substring(0,1);
         var second = event.target.value.substring(1);
         var searchVal = event.target.value;
         //alert("Ticket val:" + event.target.value);
         //alert("Len:" + arr.length)
         var contains = false;
         if(arr.includes(event.target.value)){
             contains = true;
         }
         /*for(var x=0;x<arr.length;x++){
             alert("val:" + arr.at(x) + " Event:" + event.target.value);
             if(arr.at(x).toString() === event.target.value){
                 alert("CONTAINED")
                 contains = true;
             }
         }*/
         if(contains){
                // setCardCount(cardCount + 3);


             //const cards = [];
            // for (let i = 0; i < cardCount; i++) {
             alert("here:");
             const newCard = <Card title={"hi"} subtitle={"hello"} />;
             setCards([...cards, newCard]);
             //}
         }

         //setInputValue(event.target.value);
         // do something with the input value here
         if(true){

         }
     };

     var set = [];
    const db = getFirestore(app);
     var uid;
     useEffect(message => {
         async function pleaseWork(){
             const docRef = doc(db, "gen", "open");
             const docSnap = await getDoc(docRef);

             if (docSnap.exists()) {
                 const data = docSnap.data();

                // var tempObj = JSON.stringify(data);
                 //var obj = JSON.parse(tempObj);
                // alert("Document data:" + data);
                 for (const key in data){
                    // if(data.hasOwnProperty(key)){
                         //alert("key:" + key);
                        // set.add(key);
                     //}
                 }
                 localStorage.setItem("set",JSON.stringify(data));
             } else {
                 // doc.data() will be undefined in this case
                 alert("No such document!");
             }
         }
         if (localStorage.getItem("uid") != null) {
             uid = localStorage.getItem("uid");
             pleaseWork().then(r => {});
         }
     }, [props.uid]);
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
        <div className={"Main"} style={{visibility: props.loggedIn ? 'visible' : 'hidden'}}>
            <div className={"SideBar"}>
                <input className={"Search"} onChange={searchInput}/>
                <div id={"holdCards"}>
                    {cards}
                </div>

            </div>
            <div className={"Map"}>

            </div>
        </div>
    );
}

export default TicketScreen;