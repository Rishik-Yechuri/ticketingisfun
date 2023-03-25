import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import './TicketScreenCSS.css';
import Card from "./CardComponent";
import {doc, getFirestore, getDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {getFunctions, httpsCallable} from "firebase/functions";
import Draggable from "react-draggable";
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import PanZoom from 'react-easy-panzoom';


//import firebase from 'firebase/app';

//no login
function TicketScreen(props) {
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    /* const firebaseConfig = {
         apiKey: "AIzaSyDXselQUENle1wroLiPqMGAEbK7svEWZAY",
         authDomain: "ticketingisfun.firebaseapp.com",
         projectId: "ticketingisfun",
         storageBucket: "ticketingisfun.appspot.com",
         messagingSenderId: "1001052675931",
         appId: "1:1001052675931:web:c8021c0285db0a70cd847e",
         measurementId: "G-EXHXNMV7KM"
     };
 */
// Initialize Firebase
    const [timesCalled, setTimesCalled] = useState(5);

    //const app = initializeApp();
    //const analytics = getAnalytics();
    //const functions = getFunctions();
    const lineStyle = {
        borderBottom: '1px solid #ccc',
        margin: '0em 0',
    };
    const [cards, setCards] = useState([]);
    const [cardCount, setCardCount] = useState(0); // add state for cart count
    const [inCart, setInCart] = useState([]);
    const [data, setData] = useState([]);

    const addToCart = () => {
        setCardCount(prevCount => prevCount + 1);
    };

    function createSortedCards(arr, searchQuery) {
        const filteredArr = searchQuery
            ? arr.filter((item) =>
                item.toUpperCase().startsWith(searchQuery.toUpperCase())
            )
            : arr;

        const sortedArr = filteredArr.sort((a, b) => {
            const aFirst = a.substring(0, 1);
            const bFirst = b.substring(0, 1);
            const aSecond = parseInt(a.substring(1));
            const bSecond = parseInt(b.substring(1));

            if (aFirst < bFirst) {
                return -1;
            } else if (aFirst > bFirst) {
                return 1;
            } else {
                if (aSecond < bSecond) {
                    return -1;
                } else if (aSecond > bSecond) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        // var allCardsTemp = new [];
        // setCards(allCardsTemp);
        const allCards = sortedArr.map((item, index) => {
            const first = item.substring(0, 1);
            const second = item.substring(1);
            const key = `${first}${second}`;

            return <Card key={key} setCards={setCards} uid={uid} title={first} subtitle={second} addToCart={addToCart}
                         cards={cards}/>;
        });

        setCards(allCards);
    }

    const searchInput = (event) => {
        var searchQuery = document.getElementById("SearchBar").value;
        searchQuery = searchQuery.toUpperCase();
        // Get the value of the input element
        //var textValue = inputElement.value;
        var tempArr = JSON.parse(localStorage.getItem("set"));
        var arr = [];
        for (const key in tempArr) {
            arr.push(key);
        }
        //document.getElementById('holdCards').innerHTML = "";
        var first = searchQuery.substring(0, 1);
        var second = searchQuery.substring(1);
        //var searchVal = searchQuery;
        let allCards = [];
        if (searchQuery.length <= 0) {
            createSortedCards(arr, null);
        } else if (searchQuery.length > 1) {
            var contains = false;
            if (arr.includes(searchQuery)) {
                contains = true;
            }
            if (contains) {
                // alert("here:");
                const newCard = <Card setCardNum={setCardCount} setCards={setCards} uid={uid} title={first}
                                      subtitle={second} addToCart={addToCart} cards={cards}/>;
                allCards.push(newCard);
                // setCards([...cards, newCard]);
                //}
            }
            setCards(allCards);
        } else {
            var arrToPass = [];
            for (const key in tempArr) {
                if (tempArr.hasOwnProperty(key)) {
                    if (key.startsWith(searchQuery)) {
                        arrToPass.push(key);
                    }
                }
            }
            createSortedCards(arrToPass, searchQuery);
        }
    };

    var set = [];
    const db = getFirestore();
    var uid;
    useEffect(message => {
        async function pleaseWork() {
            const docRef = doc(db, "gen", "open");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
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

    function goToCheckout() {
        props.goCheckout();
        // props.setCheckoutVisible(true);
    }

    function loadSeating() {
        const seatingMain = document.getElementById("seatingMain");
        seatingMain.innerHTML = "";
        const alphabet = "XWVUTSRPONMLKJHGFEDCB";
        const noLeft = "X";
        const soundBoothRows = "XWV";


        const soundBooth = document.createElement("div");
        soundBooth.id = "soundBooth";
        soundBooth.className = "soundBooth";
        soundBooth.style.position = "absolute";
        soundBooth.style.left = "calc(50% - 14 * 1em)";
        soundBooth.style.backgroundColor = 'gray'; // Change to the desired background color
        soundBooth.style.width = "calc(14 * 2em)";
        soundBooth.style.height = "calc(3 * 2em + 2 * 0.25em)"; // Assuming each row has a height of 2em and 0.1em margin

        const wheelChairText = document.createTextNode("Wheelchair\nArea");
        const soundBoothText = document.createTextNode("Sound\nBooth")
        const wheelchairSpan = document.createElement('span');
        const soundBoothSpan = document.createElement('span');

        wheelchairSpan.className = 'soundBoothText';
        wheelchairSpan.appendChild(wheelChairText);
        soundBoothSpan.className = 'soundBoothText2';
        soundBoothSpan.appendChild(soundBoothText);
        //Add it to Sound Booth
        soundBooth.appendChild(wheelchairSpan);
        const thinLine = document.createElement("div");
        thinLine.className = "thinLine";
        soundBooth.appendChild(thinLine)
        soundBooth.appendChild(soundBoothSpan);
        for (var y = 0; y < alphabet.length; y++) {
            var currRow = alphabet.charAt(y);
            var element = document.createElement("div");
            element.id = "wideDiv" + currRow;
            element.className = "wideDiv";
            element.style.width = 'wrap-content';
            const seatConfig = getSeatConfig(currRow);
            // Left side
            if (currRow !== noLeft) {
                for (var x = seatConfig.leftMax; x >= 2; x -= 2) {
                    addSeat(currRow, x, element);
                }
            } else {
                for (var x = 16; x >= 2; x -= 2) {
                    addFakeSeat(element);
                }
            }

            // Row label
            /*const leftRow = document.createTextNode(currRow);
            leftRow.className ="wideDiv";
            element.appendChild(leftRow);*/
            // Row label
            const leftRow = document.createTextNode(currRow);
            const leftRowSpan = document.createElement('span');
            leftRowSpan.className = 'rowText';
            leftRowSpan.appendChild(leftRow);
            element.appendChild(leftRowSpan);

            // Center seats
            if (!soundBoothRows.includes(currRow)) {
                for (var x = 101; x <= 113; x++) {
                    addSeat(currRow, x, element);
                }
            } else {
                for (var x = 101; x <= 113; x++) {
                    addFakeSeat(element);
                }
            }
            /* const middleRow = document.createTextNode(currRow);
             element.appendChild(middleRow);*/
            const middleRow = document.createTextNode(currRow);
            const middleRowSpan = document.createElement('span');
            middleRowSpan.className = 'rowText';
            middleRowSpan.appendChild(middleRow);
            element.appendChild(middleRowSpan);
            // Row label

            // Right side
            for (var x = 1; x <= seatConfig.rightMax; x += 2) {
                addSeat(currRow, x, element);
            }

            seatingMain.appendChild(element);

            if (currRow === "X") {
                seatingMain.appendChild(soundBooth);
            }
        }
        loadExisting().then(r => {
        });
    }

    async function loadExisting() {
        //await sleep(1000);
        var tempArr = await JSON.parse(localStorage.getItem('data'));
        for (const key in tempArr) {
            var firstPart = key.substring(0, 1);
            var secondPart = key.substring(1);
            const seatDiv = await document.getElementById("innerCell" + firstPart + "X" + secondPart);
            //alert("key:" + key);
            seatDiv.style.backgroundColor = 'whitesmoke';
        }
    }

    function addSeat(row, seatNumber, parentElement) {
        var insideElement = document.createElement("div");
        insideElement.id = "innerCell" + row + "X" + seatNumber;
        insideElement.className = "innerCell";
        const textNode = document.createTextNode(seatNumber);
        insideElement.appendChild(textNode);
        // Add flag to prevent click event after drag event
        var dragging = false;

// Add event listener for touchstart or mousedown
        insideElement.addEventListener('touchstart', function (e) {
            dragging = false;
        });
        insideElement.addEventListener('mousedown', function (e) {
            dragging = false;
        });

// Add event listener for touchmove or mousemove
        insideElement.addEventListener('touchmove', function (e) {
            dragging = true;
        });
        insideElement.addEventListener('mousemove', function (e) {
            dragging = true;
        });

// Add event listener for touchend or mouseup
        insideElement.addEventListener('touchend', endHandler);
        insideElement.addEventListener('mouseup', endHandler);

// Handle end of dragging or touch
        function endHandler(e) {
            if (!dragging) {
                clickHandler(e);
            }
            dragging = false;
        }

        // Add event listener for click or tap
        // insideElement.addEventListener('click', clickHandler);


        parentElement.appendChild(insideElement);

    }

    function clickHandler(event) {
        const id = event.target.id;
        var isInCart = false;
        var firstPart;
        var secondPart;
        //var firstPart = key.substring(0, 1);
        //var secondPart = key.substring(1);
        var data = JSON.parse(localStorage.getItem('cart'));
        if (data && Array.isArray(data)) {
            // Loop through the cartArray using forEach
            data.forEach(function (item, index) {
                // Your code to handle each item in the array
                var tempFirstPart = item.substring(0, 1);
                var tempSecondPart = item.substring(1);
                alert("Item:" + item + " id:" + (id));
                if (id === ('innerCell' + tempFirstPart + 'X' + tempSecondPart)) {
                    isInCart = true;
                    firstPart = tempFirstPart;
                    secondPart = tempSecondPart;
                    //It's in cart
                }
            });
        } else {
            console.log('No cart data found or invalid cart data.');
        }
        var element = document.getElementById(id);
        alert("here:" + isInCart);

        if (isInCart) {
            //Remove from cart frontend
            element.style.backgroundColor = 'whitesmoke';
            //alert('cardCount:' + cardCount);
            var cartBadge = document.getElementById('cartBadge');

// Get the text content of the span
            var cartBadgeText = cartBadge.textContent;

// Convert the text content to an integer
            var cartBadgeNumber = parseInt(cartBadgeText, 10);
            var newCartBadgeNumber = cartBadgeNumber - 1;

            cartBadge.textContent = (newCartBadgeNumber.toString());
            setCardCount(newCartBadgeNumber);
            // setCardCount(newCount);
            //Call remove from cart backend
            const functions = getFunctions();
            const removeFromCart = httpsCallable(functions, 'removeFromCart');
            //alert('id:' + (firstPart+secondPart));
            removeFromCart({'uid': localStorage.getItem('uid'), 'fieldName': (firstPart + secondPart)})
                .then((result) => {
                    const data = result.data;
                    if (data.status !== 'pass') {
                        element.style.backgroundColor = '#5f3e90';
                    } else if (data.status === 'pass') {
                        //alert("Error removing(Session may have timed out,refresh)");
                    }
                }).catch((error) => {
                alert('Client Error: ' + error);
            });
        } else {
            //Call checkIfFieldExists
            const functions = getFunctions();
            const checkFieldExists = httpsCallable(functions, 'checkFieldExists');
            var tempId = id.replace('innerCell', '');
            var first = tempId.substring(0, 1);
            var second = tempId.substring(2, id.length)
            const fieldName = first + second;

            checkFieldExists({'fieldName': [fieldName], 'uid': uid})
                .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    const data = result.data;
                    var returnMessage = data.message;
                    if (returnMessage !== 'Not Available anymore' && returnMessage !== 'Error Adding') {
                        var element = document.getElementById(id);
                        element.style.backgroundColor = '#5f3e90';
                        var cartBadge = document.getElementById('cartBadge');

                        var cartBadgeText = cartBadge.textContent;

                        var cartBadgeNumber = parseInt(cartBadgeText, 10);
                        var newCartBadgeNumber = cartBadgeNumber + 1;

                        cartBadge.textContent = (newCartBadgeNumber.toString());
                        setCardCount(newCartBadgeNumber);
                        //const cartKey = uid + " cart";
                        //let cart = /*JSON.parse(localStorage.getItem(cartKey)) || */[];
                        //cart.push(id);
                        //localStorage.setItem(cartKey, JSON.stringify(cart));
                        //addToCart(); // call addToCart function to update cart count
                    } else {
                       /* if (buttonText !== "✓") {
                            alert(returnMessage);
                        }*/
                    }
                });
        }
    }

    function addFakeSeat(parentElement) {
        var insideElement = document.createElement("div");
        //insideElement.id = "innerCell" + row + "X" + seatNumber;
        insideElement.className = "innerCellFake";
        //const textNode = document.createTextNode(seatNumber);
        //insideElement.appendChild(textNode);
        parentElement.appendChild(insideElement);
    }

    function getSeatConfig(row) {
        const specialRows = "JKLMNOPRST";
        const rowH = "H";
        const rowsED = "ED";
        const rowC = "C";
        const rowB = "B";
        const rowA = "A";
        const rowsWVU = "WVU";
        // const rowT = "T";
        const rowX = "X";

        if (specialRows.includes(row)) {
            return {leftMax: 22, rightMax: 21};
        } else if (row === rowH) {
            return {leftMax: 24, rightMax: 23};
        } else if (rowsED.includes(row)) {
            return {leftMax: 18, rightMax: 17};
        } else if (row === rowC) {
            return {leftMax: 16, rightMax: 15};
        } else if (row === rowB) {
            return {leftMax: 14, rightMax: 13};
        } else if (row === rowA) {
            return {leftMax: 12, rightMax: 11};
        } else if (rowsWVU.includes(row)) {
            return {leftMax: 20, rightMax: 19};
        } /*else if (row === rowT) {
           // return {leftMax: 12, rightMax: 11};
        }*/ else if (row === rowX) {
            return {leftMax: 1, rightMax: 15};
        } else {
            return {leftMax: 20, rightMax: 19};
        }
    }

    useEffect(() => {
        loadSeating();
        myFunction();
        const functions = getFunctions();
        const cartExists = httpsCallable(functions, 'cartExists');
        //alert("HERE")
        cartExists({'uid': localStorage.getItem('uid')})
            .then((result) => {
                //  alert("Here 2");
                const data = result.data;
                //alert('status:' + data.status);
                if (data.status === 'pass') {
                    if (data.message.length <= 0) {
                        setCardCount(0);
                    } else {
                        var inCart = data.message.split(',');
                        // alert('inCart:' + JSON.stringify(inCart) + " len:" + inCart.length);
                        setCardCount(inCart.length);
                    }
                } else {
                    setCardCount(0);
                    //alert("failed update")
                }
            }).catch((error) => {
            alert('Client Error: ' + error.message);
        });
    }, [props.ticketIn]);
    var rejectModernity = (event) => {
        event.preventDefault();
        return false;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const myFunction = () => {
        // alert('Function called every X seconds');
        const functions = getFunctions();
        const cartExists = httpsCallable(functions, 'cartExists');
        cartExists({'uid': localStorage.getItem('uid')})
            .then(async (result) => {
                //  alert("Here 2");
                const docRef = await doc(db, "gen", "open");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data2 = await docSnap.data();
                    await localStorage.setItem('data', JSON.stringify(data2))
                    //await setData(JSON.parse(JSON.stringify(data2)));
                    const data = result.data;
                    await loadSeating();
                    // alert('status:' + data.status);
                    if (data.status === 'pass') {
                        //Display products
                        var inCartNow = data.message.split(',');
                        localStorage.setItem('cart', JSON.stringify(inCartNow));
                        setInCart(inCartNow);

                        inCartNow.forEach((value) => {
                            const seatDiv = document.getElementById("innerCell" + value.substring(0, 1) + "X" + value.substring(1));
                            if (seatDiv) {
                                seatDiv.style.backgroundColor = '#5f3e90';
                            }
                        });
                    } else if (data.status !== 'fail') {
                        //alert("Server error");
                    }
                }
            }).catch((error) => {
            alert('Client Error: ' + error.message);
        });
    };

    useEffect(() => {
        // Set up the interval to call the function every X seconds
        const interval = setInterval(myFunction, 300000);

        // Clean up the interval when the component is unmounted
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className={"Main3"} /* style={{visibility: props.ticketIn ? 'visible' : 'hidden'}}*/>
            <div className={"mapDetails"}>
                <div id={"colorOne"}></div>
                <text>Unavailable</text>
                <div id={"colorTwo"}></div>
                <text>In Cart</text>
                <div id={"colorThree"}></div>
                <text>Available</text>
                <text id={"zoomText"}>Map can be zoomed/dragged</text>
            </div>
            <div id="panContainer">
                <PanZoom className={"zoomClass"}>
                    <div id="seatingMain"></div>
                </PanZoom>
            </div>
            <text className={"eventText"}>Ticket - $12.99 each(1 Dinner box included per ticket)</text>
            <div className={"stickRight"}>
                <img onClick={goToCheckout} id={"cartPng"} src={require('./cart.png')}/>
                <span id={"cartBadge"} className="badge">{cardCount}</span>
            </div>
            <div className={"SideBar"}>
                <input placeholder={"Search(Ex:C or C15)"} id={"SearchBar"} className={"Search"} onChange={timesUp}/>
                <div id={"holdCards"}>
                    {cards}
                </div>
            </div>
            {/* <div id={"holdPng"}>
                <img id={"seatingPng"} src={require('./wpac.png')} />
            </div>
            <text className={"eventText"}>Ticket - $12.99 each(1 Dinner box included per ticket)</text>

            <div className={"stickRight"}>
                <img  onClick={goToCheckout} id={"cartPng"} src={require('./cart.png')}  />
                <span className="badge">{cardCount}</span>
            </div>
            <div className={"SideBar"}>
                <input placeholder={"Search(Ex:C or C15)"} id={"SearchBar"} className={"Search"} onChange={timesUp}/>
                <div id={"holdCards"}>
                    {cards}
                </div>

            </div>*/}

        </div>
    );
}

export default TicketScreen;