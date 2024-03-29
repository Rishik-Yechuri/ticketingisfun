import React, {useState} from 'react';
import './CardComponentCSS.css'
import firebase, {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import {getFirestore} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

function Card({newCards,setNewCards,addToCart,removeEnabled,uid,title, subtitle, id,setCardsCall }) {
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
    //const [timesCalled, setTimesCalled] = useState(0);

    const app = initializeApp(firebaseConfig);
    const functions = getFunctions(app);
    const [buttonText, setButtonText] = useState(removeEnabled ? 'Remove' : 'Add');

    const db = getFirestore(app);

    async function checkFieldExists() {
       // alert("checkFieldExists")
        if (removeEnabled) {
           // alert("remove enabled")
            //onRemove();
            await handleRemove();
        } else {
            //alert("HERE: " + id)
            setButtonText("✓" );
            const functions = getFunctions();
            const checkFieldExists = httpsCallable(functions, 'checkFieldExists');
            const fieldName = title + subtitle;

            await checkFieldExists({'fieldName': [fieldName], 'uid': uid})
                .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    const data = result.data;
                    var returnMessage = data.message;
                    if(returnMessage !== 'Not Available anymore' && returnMessage!== 'Error Adding'){
                        const cartKey = uid + " cart";
                        let cart = /*JSON.parse(localStorage.getItem(cartKey)) || */[];
                        cart.push(id);
                        //localStorage.setItem(cartKey, JSON.stringify(cart));
                        addToCart(); // call addToCart function to update cart count
                    }else{
                        if(buttonText !== "✓"){
                            alert(returnMessage);
                        }
                    }
                });
        }
    }
    const handleRemove =  () => {
        const functions =  getFunctions();
        const removeFromCart =  httpsCallable(functions, 'removeFromCart');
        removeFromCart({'uid': localStorage.getItem('uid'), 'fieldName': id})
            .then((result) => {
                const data = result.data;
                if (data.status === 'pass') {
                   // alert("Handle remove");
                    setNewCards(newCards+1);
                    // Remove the card from the list
                } else {
                    alert("Error removing(Session may have timed out,refresh)");
                }
            }).catch((error) => {
            //alert('Client Error: ' + error);
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
            <button id={"removeButton"} className="remove" onClick={checkFieldExists}>
                {buttonText}
            </button>
        </div>
    );
}

export default Card;