import React, {useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {getFunctions, httpsCallable} from "firebase/functions";
import Card from "./CardComponent";
import {initializeApp} from "firebase/app";
const PaymentForm = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

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
            billing_details: {},
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            alert('problem with payment');
            return;
        }
        //alert("cart:" +  paymentMethod);
        const functions = getFunctions();
        const cartExists = httpsCallable(functions, 'prayToGod');
       // alert('uid:' + localStorage.getItem('uid'));
        cartExists({  paymentMethod: paymentMethod,'uid': localStorage.getItem('uid'),'currency':'usd','amount':(1200 * props.cardNum)})
            .then((result) => {
               // alert("Here 2");
                const data = result.data;
                if (data.status === 'pass') {
                    alert('Payment Accepted!');
                } else if (data.status === 'fail') {
                   // alert('Message:' + data.message)
                    alert("No Items in cart or time limit exceeded(10 minutes)");
                } else {
                    alert("Server error:" + JSON.stringify(data.message));
                }
            }).catch((error) => {
            alert('Client Error: ' + (error.message).toString());
        })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="card-element">Credit or debit card</label>
                <div id="card-element">
                    <CardElement />
                </div>
            </div>
            <button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Pay"}
            </button>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
    );
};
export default PaymentForm;