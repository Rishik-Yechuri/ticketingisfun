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
            billing_details: {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '123-456-7890',
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            alert('problem without payment');
            return;
        }
        alert("cart:" +  paymentMethod);
        const functions = getFunctions();
        const cartExists = httpsCallable(functions, 'prayToGod');
        alert('uid:' + localStorage.getItem('uid'));
        cartExists({  paymentMethod: paymentMethod,'uid': localStorage.getItem('uid'),'currency':'usd','amount':(1200 * props.cardNum)})
            .then((result) => {
                alert("Here 2");
                const data = result.data;
                if (data.status === 'pass') {
                    alert('Payment Accepted!');
                } else if (data.status === 'fail') {
                    alert('Message:' + data.message)
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
/*const PaymentForm = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    //var clientSecret = '';
    const firebaseConfig = {
        apiKey: "AIzaSyDXselQUENle1wroLiPqMGAEbK7svEWZAY",
        authDomain: "ticketingisfun.firebaseapp.com",
        databaseURL: "https://ticketingisfun-default-rtdb.firebaseio.com",
        projectId: "ticketingisfun",
        storageBucket: "ticketingisfun.appspot.com",
        messagingSenderId: "1001052675931",
        appId: "1:1001052675931:web:c8021c0285db0a70cd847e",
        measurementId: "G-EXHXNMV7KM"
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const { error, paymentMethod } =  stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '123-456-7890',
            },
        });
        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            alert('problem without payment');
            return;
        }
        const functions = getFunctions();
        const cartExists = httpsCallable(functions, 'prayToGod');
        alert('uid:' + localStorage.getItem('uid'));
        cartExists({ paymentMethod: paymentMethod,'uid': localStorage.getItem('uid'),'currency':'usd','amount':(1200 * props.cardNum)})
            .then((result) => {
                alert("Here 2");
                const data = result.data;
                if (data.status === 'pass') {
                    alert('Payment Accepted!');
                } else if (data.status === 'fail') {
                    alert('Message:' + data.message)
                    alert("No Items in cart or time limit exceeded(10 minutes)");
                } else {
                    alert("Server error:" + JSON.stringify(data.message));
                }
            }).catch((error) => {
            alert('Client Error: ' + (error.message).toString());
        });
    };


     /!*   const result =  stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        line1: '931 Drive E',
                        city: 'Richardson',
                        state: 'TX',
                        postal_code: '75080',
                        country: 'US',
                    },
                },
            },
        });
        alert('Stipe Confired Payment');

        if (result.error) {
            setErrorMessage(result.error.message);
            setProcessing(false);
            alert('Error with payment:' + result.error.message);
        } else {
            setErrorMessage(null);
            setProcessing(false);
            alert('Payment succeeded!');
        }*!/
  //  };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="card-element">Credit or debit card</label>
                <div id="card-element">
                    <CardElement/>
                </div>
            </div>
            <button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Pay"}
            </button>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
    );
};*/

export default PaymentForm;