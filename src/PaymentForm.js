import React, {useEffect, useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {getFunctions, httpsCallable} from "firebase/functions";
import './PaymentStyle.css';
import Card from "./CardComponent";
import {initializeApp} from "firebase/app";
import {loadStripe} from "@stripe/stripe-js";

const PaymentForm = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [total, setTotal] = useState(0); // new state variable to store the total amount

    useEffect(() => {
        // update the total amount when props change
        setTotal(50 * props.cardNum);
    }, [props.cardNum]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                address:{
                    line1: event.target.address.value,
                    city: event.target.city.value,
                    state: event.target.state.value,
                }
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            alert('problem with payment');
            return;
        }
        //alert("cart:" +  paymentMethod);
      /*  const firebaseConfig = {
            apiKey: "AIzaSyDXselQUENle1wroLiPqMGAEbK7svEWZAY",
            authDomain: "ticketingisfun.firebaseapp.com",
            projectId: "ticketingisfun",
            storageBucket: "ticketingisfun.appspot.com",
            messagingSenderId: "1001052675931",
            appId: "1:1001052675931:web:c8021c0285db0a70cd847e",
            measurementId: "G-EXHXNMV7KM",
            functionsEmulatorHost: 'localhost:5001',
            functionsEmulatorPort: '5001'
            /!*functionsEmulatorHost: 'localhost:5001',*!/
        };
        const app = initializeApp(firebaseConfig);*/
        //alert("HERE")
        const functions = getFunctions();
        const cartExists = httpsCallable(functions, 'prayToGod');
       // alert('uid:' + localStorage.getItem('uid'));
        //alert('name:' + localStorage.getItem('name'));
        //alert('uid:' + localStorage.getItem('uid'));

        //alert('payment:' + JSON.stringify(paymentMethod));
         await cartExists({  paymentMethod: paymentMethod,'name':localStorage.getItem('name'),'uid': localStorage.getItem('uid').toLowerCase(),'currency':'usd','amount':(1299 * props.cardNum)})
            .then((result) => {
               // alert("Here 2");
                const data = result.data;
                if (data.status === 'pass') {
                    props.goToEnd();
                    //alert('Payment Accepted!');
                } else if (data.status === 'fail') {
                    alert("No Items in cart or time limit exceeded(10 minutes)");
                } else {
                    alert("Server error:" + JSON.stringify(data.message));
                }
            }).catch((error) => {
            alert('Client Error: ' + (error).toString());
        })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (

        <form id={"paymentMain"} onSubmit={handleSubmit}>

{/*
                <label htmlFor="total">Total:</label>
*/}

            <div id="total">Total:${total/100}</div>
                <div className={"separator"}></div>


            <div className="form-group">
                <label className={"paymentText"} htmlFor="card-element">Credit or debit card</label>
                <div id="card-element">
                    <CardElement />
                </div>
            </div>
            <div className="form-group2">
                <input className={'paymentAddition'} type="text" id="name" name="name" required placeholder={"Name"}/>
            </div>

            <div className="form-group2">
                <input className={'paymentAddition'} type="text" id="address" name="address" required placeholder={"Address"} />
            </div>

            <div className="form-group2">
                <input className={'paymentAddition'} type="text" id="city" name="city" required placeholder={"City"}/>
            </div>

            <div className="form-group2">
                <input className={'paymentAddition'} type="text" id="state" name="state" required placeholder={"State"}/>
            </div>


            <button id={"finalPaymentButton"} type="submit" disabled={processing}>
                {processing ? "Processing..." : "Pay"}
            </button>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
    );
};
export default PaymentForm;