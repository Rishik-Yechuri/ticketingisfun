import React, {useEffect, useState} from 'react';
import './EndPageStyle.css'


function EndPage() {


    return (
        <div className={"finalPage"}>
            <text className={"finalText"}>Purchased tickets will be emailed to you soon! To purchase more refresh.
            </text>
            <a href="https://www.linkedin.com/in/rishiky" className="resumeButton">Built by Rishik Yechuri</a>
        </div>
    );
}

export default EndPage;
