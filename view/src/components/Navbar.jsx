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
                    <a href="/signin" class="button">Sign In</a>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar