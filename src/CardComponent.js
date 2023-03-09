import React from 'react';
import './CardComponentCSS.css'
function Card({ title, subtitle,onRemove }) {
    return (
        <div className={"TopDiv"} style={{


        }}>
            <div className={"HorizDiv"}>
                <p style={{ color:"whitesmoke", fontSize: '1.2em', marginBottom: '0.5em'}}>{title}</p>
                <p style={{color:"whitesmoke", fontSize: '1em' }}>{subtitle}</p>
            </div>
            <div className={"Space"}></div>
            <button className="remove" onClick={onRemove}>
                Add
            </button>
        </div>
    );
}

export default Card;