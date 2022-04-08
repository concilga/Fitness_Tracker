import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Footer= () => {
    return (
        <footer>
            <h1 id="footer-logo">FitnessPlus LLC</h1>
            <div id="footer-tools">
                <p>Terms and Conditions</p>
                <p>Help</p>
                <p>About</p>
            </div>
            <div id="footer-social">
                <img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png"/>
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png"/>
                <img src="https://img.icons8.com/color/48/000000/twitter--v1.png"/>
                <img src="https://img.icons8.com/color/48/000000/pinterest--v1.png"/>
            </div>
        </footer>
    )
}

export default Footer;