import React, {useEffect, useState} from 'react';
import './CheckoutCSS.css';
import {getFunctions, httpsCallable} from "firebase/functions";
import Card from "./CardComponent";

function Checkout(props) {
    // Define state for the purchased cards
    const [cards, setCards] = useState([]);

    // Define a function to handle removing a card from the list
    const handleRemoveCard = (cardId) => {
        setCards(cards.filter(card => card.id !== cardId));
    };
    useEffect(() => {
        //alert("Here:" + props.visible)
        if(props.visible === true){
            const functions = getFunctions();
            const cartExists = httpsCallable(functions, 'cartExists');
            //alert('uid:' + localStorage.getItem('uid'));
            cartExists({  'uid' : localStorage.getItem('uid')})
                .then((result) => {
                    //alert("Here 2");
                    const data = result.data;
                    if(data.status === 'pass'){
                        //Display products
                        var inCart = data.message.split(',');
                        const allCards = [];
                        //alert('inCart:' + inCart);
                        inCart.forEach((value) => {
                            var first = value.substring(0,1);
                            var second = value.substring(1);
                            const newCard = <Card uid={localStorage.getItem('uid')} title={first} subtitle={second}/>;
                            allCards.push(newCard);
                        });
                      /* for(var item in inCart){
                           alert("Item:" + item);
                           var first = item.substring(0,1);
                           var second = item.substring(1);
                           const newCard = <Card uid={localStorage.getItem('uid')} title={first} subtitle={second}/>;
                           allCards.push(newCard);
                       }*/
                        setCards(allCards);
                    }else if(data.status === 'fail'){
                        alert("No Items in cart(10 minute time limit to buy tickets)");
                    }else{
                        alert("Server error");
                    }
                    //alert("Here 3:" + data.status + " " + JSON.stringify(data.message));
                    // const sanitizedMessage = data.text;
                });
        }

    }, [props.visible]);


    return (
        <div className="checkout-page" style={{visibility: props.visible ? 'visible' : 'hidden'}}>
            <div className="purchased-cards">
                <h2>Purchased Cards</h2>
                {cards}
            </div>
            <div className="payment-box">
                {/* Payment box content goes here */}
            </div>
        </div>
    );
}

export default Checkout;
