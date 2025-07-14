import React, { useState } from 'react'
import './NavBar.css'

function Nav() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav >
            <div className="navbar">
                <div className="navbar-logo">
                    <p>BSM Model</p>
                </div>
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
                    <li><a href="#home" onClick={() => setMenuOpen(!menuOpen)}>Home</a></li>
                    <li><a href="#calc" onClick={() => setMenuOpen(!menuOpen)}>Calculator</a></li>
                    <li><a href="#form" onClick={() => setMenuOpen(!menuOpen)}>Formula</a></li>
                </ul>
            </div>
            
        </nav>
    );

}

export default Nav;