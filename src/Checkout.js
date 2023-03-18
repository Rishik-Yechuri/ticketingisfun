import React, {useEffect, useState} from 'react';
import './CheckoutCSS.css';
import {getFunctions, httpsCallable} from "firebase/functions";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import Card from "./CardComponent";
import PaymentForm from "./PaymentForm";
import {FaArrowLeft} from "react-icons/fa";

import {initializeApp} from "firebase/app";
//const promise = loadStripe("pk_test_51MkMPFGrSpioNuBcxC8R6iINnsy6qsTpjCgYEKEVgrK0TuZM60JsZETBSmmkvBbeH1cCikRkpjioCJvw6dYIkkVi00EzlSm3t6");


const stripePromise = loadStripe('pk_live_51MkMPFGrSpioNuBcs2I3rqZDsMQfayYDS2pCY7OHQ4aqMxMl13Xsu6FsOD6PVDui6BIxoUJ8Npe7ItkkLWtG2BBG00lPMhefzq');


function Checkout(props) {
    // Define state for the purchased cards
    const [pay, setPay] = useState(0);
    const [event, setEvent] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardNum, setCardNum] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    /*const stripe = useStripe();
    const elements = useElements();*/
    // Define a function to handle removing a card from the list
    useEffect(() => {
        if (pay > 0) {
            // handleSubmit(event);
        }
    }, [pay]);

    const handleBackClick = () => {
        props.leaveCheckout();
        // Handle the back button click event here
    };

    function setCardsAll(id) {
        //alert("Remove ID:" + id);
        const newCards = [];
       // const ids = [];
        // alert("cards:" + localStorage.getItem('cards'));
        // setCards(JSON.parse(localStorage.getItem('cards')));
         const cardTemp =[]; //JSON.parse(localStorage.getItem('cardIds'));
         //alert('cardTemp:' + JSON.stringify(cardTemp));
        for (let i = 0; i < cardTemp.length; i++) {
           // alert('id:' + id + " cards[" + i + "].id:" + cardTemp.get(i).id);
            if (cardTemp[i] !== id) {
                const first = cardTemp[i].substring(0, 1);
                const second = cardTemp[i].substring(1);
                const key = `${first}${second}`;

                //alert('cardTemp[i]:' + cardTemp[i] + " id:" + id);
                newCards.push(<Card setCardsCall={setCardsAll} removeEnabled={true}
                                    uid={localStorage.getItem('uid')} title={first}
                                    subtitle={second} id={cardTemp[i]}/>);
            }
        }
        setCards(newCards);
        //localStorage.setItem('cardIds',JSON.stringify(newCards));
        setCardNum(newCards.length);
    }
    useEffect(() => {
        if (props.visible === true) {
            const functions = getFunctions();
            const cartExists = httpsCallable(functions, 'cartExists');
            //alert('uid:' + localStorage.getItem('uid'));
            cartExists({'uid': localStorage.getItem('uid')})
                .then((result) => {
                    //alert("Here 2");
                    const data = result.data;
                    if (data.status === 'pass') {
                        //Display products
                        var inCart = data.message.split(',');
                        const allCards = [];
                        const ids = [];
                        //alert('inCart:' + inCart);
                        inCart.forEach((value) => {
                            var first = value.substring(0, 1);
                            var second = value.substring(1);
                            if (first.length > 0 && second.length > 0) {
                                const newCard = <Card setCardsCall={setCardsAll} removeEnabled={true}
                                                      uid={localStorage.getItem('uid')} title={first}
                                                      subtitle={second} id={value}/>;
                                ids.push(value);
                                allCards.push(newCard);
                            }

                        });
                       // alert("setcards:" + JSON.stringify(ids))
                        setCards(allCards);
                        //localStorage.setItem('cardIds',JSON.stringify(ids));
                        setCardNum(allCards.length);
                    } else if (data.status === 'fail') {
                        alert("No Items in cart(or 10 minute time limit to buy tickets exceeded,try refreshing)");
                    } else {
                        alert("Server error");
                    }
                }).catch((error) => {
                alert('Client Error: ' + error.message);
            });
            //Get bought
            // const functions = getFunctions();
           /* const boughtExists = httpsCallable(functions, 'boughtExists');
            //alert('uid:' + localStorage.getItem('uid'));
            boughtExists({'uid': localStorage.getItem('uid')})
                .then((result) => {
                    //alert("Here 2");
                    const data = result.data;
                    if (data.status === 'pass') {
                        //Display products
                        var inCart = data.message.split(',');
                        const allCards = [];
                        const ids = [];
                        //alert('inCart:' + inCart);
                        inCart.forEach((value) => {
                            var first = value.substring(0, 1);
                            var second = value.substring(1);
                            const newCard = <Card setCardsCall={setCardsAll} set={cards} removeEnabled={true}
                                                  uid={localStorage.getItem('uid')} title={first}
                                                  subtitle={second} id={value}/>;
                            ids.push(value);
                            allCards.push(newCard);
                        });
                        setCards(allCards);
                       // localStorage.setItem('cardIds',JSON.stringify(ids));
                        //setCardNum(allCards.length);
                    } else if (data.status === 'fail') {
                        //alert("No Items in cart(or 10 minute time limit to buy tickets exceeded,try refeshing)");
                    } else {
                       // alert("Server error when getting purchased items");
                    }
                });*/
        }

    }, [props.visible]);


    return (
        <div className="checkout-page" style={{visibility: props.visible ? 'visible' : 'hidden'}}>
            <text id={"billingContact"}>For any billing issues please contact kalamandapamdanceschool@gmail.com</text>
            <div id="backCheckout" onClick={handleBackClick}>
                <FaArrowLeft size={24}/>
            </div>
            <div className="purchased-cards">
                <h2 id={"CartText"}>Cart </h2>
                {cards}
            </div>

            <div className="payment-box">
                <Elements stripe={stripePromise}>
                    <PaymentForm cardNum={cards.length} goToEnd={props.goToEnd} setEvent={setEvent} setPay={setPay}/>
                </Elements>
            </div>
        </div>
    );
}

export default Checkout;
