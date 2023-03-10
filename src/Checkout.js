import React, { useState } from 'react';
import './CheckoutCSS.css';

function Checkout(props) {
    // Define state for the purchased cards
    const [cards, setCards] = useState([
        { id: 1, name: 'Card 1' },
        { id: 2, name: 'Card 2' },
        { id: 3, name: 'Card 3' },
    ]);

    // Define a function to handle removing a card from the list
    const handleRemoveCard = (cardId) => {
        setCards(cards.filter(card => card.id !== cardId));
    };

    return (
        <div className="checkout-page" style={{visibility: props.visible ? 'visible' : 'hidden'}}>
            <div className="purchased-cards">
                <h2>Purchased Cards</h2>
                {cards.map(card => (
                    <div key={card.id} className="card">
                        <span>{card.name}</span>
                        <button onClick={() => handleRemoveCard(card.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="payment-box">
                {/* Payment box content goes here */}
            </div>
        </div>
    );
}

export default Checkout;
