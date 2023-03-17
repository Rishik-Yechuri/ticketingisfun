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
import './EndPageStyle.css'




function EndPage() {



    return (
        <div className={"finalPage"}>
        <text className={"finalText"}>Purchased tickets will be emailed to you soon! To purchase more refresh.</text>
        </div>
    );
}

export default EndPage;
