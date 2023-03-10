import React from 'react';
import './CardComponentCSS.css'
import firebase, {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import {getFirestore} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

function Card({ uid,title, subtitle }) {
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
    //const [timesCalled, setTimesCalled] = useState(0);

    const app = initializeApp(firebaseConfig);
    const functions = getFunctions(app);

    const db = getFirestore(app);

    function checkFieldExists() {
        alert("Called")
        const functions = getFunctions();
        const checkFieldExists = httpsCallable(functions, 'checkFieldExists');
        const fieldName = title + subtitle;
        //fieldName = fieldName.toString();
        alert("uid:" + uid)
        checkFieldExists({ 'fieldName': [fieldName] , 'uid' : uid})
            .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                if(JSON.stringify(data) !== ''){
                    alert("Data:" + JSON.stringify(data));
                    //alert(JSON.stringify(data).length);
                }
               // const sanitizedMessage = data.text;
            });

    }
    return (
        <div className={"TopDiv"} style={{


        }}>
            <div className={"HorizDiv"}>
                <p style={{ color:"whitesmoke", fontSize: '1.2em', marginBottom: '0.5em'}}>{"Row " + title}</p>
                <p style={{color:"whitesmoke", fontSize: '1em' }}>{"Seat #" + subtitle}</p>
            </div>
            <div className={"Space"}></div>
            <button className="remove" onClick={checkFieldExists}>
                Add
            </button>
        </div>
    );
}

export default Card;