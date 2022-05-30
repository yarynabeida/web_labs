import React from 'react';

export function Navbar(logo, main, login, register) {
    return (
        <nav>
        <ul className="nav">
            <li className="nav-item">
                <img src={logo} alt="" width="130" height="30"></img>
            </li>
            <li className="nav-item">
                <button className="nav-btn" id="navigation-about-button" onClick={main}>About</button>
            </li>
            <li className="nav-item">
                <button className="nav-btn" id="navigation-log-button" onClick={login}>Log In</button>
            </li>
            <li className="nav-item">
                <button className="nav-btn" id="navigation-register-button" onClick={register}>Sign Up</button>
            </li>
        </ul>
    </nav>
    );
}