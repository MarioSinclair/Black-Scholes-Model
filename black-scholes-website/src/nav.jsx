import React, { useState } from 'react'
import './nav.css'

function Nav() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
        <div className="navbar-logo">Black-Scholes Pricing</div>
        <div
        className={`burger-menu${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') setMenuOpen(!menuOpen); }}
        >
            <div className="bar top-bar"></div>
            <div className="bar middle-bar"></div>
            <div className="bar bottom-bar"></div>
        </div>
        <ul className={`navbar-links${menuOpen ? ' show' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/calculator">Calculator</a></li>
            <li><a href="/about">About</a></li>
        </ul>
        </nav>
    );

}

export default Nav;