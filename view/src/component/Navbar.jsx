import React from 'react'
import './Navbar.css'
const Navbar = () => {
    return (
        <nav class="navbar" >
            <div class="nearus">
                NEAR<b>US</b>
            </div>
            <div>
                <ul class="about">
                    <li>About</li>
                    <li>Contact</li>
                    <button class="button">Sign In</button>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar