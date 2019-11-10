import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';


function NavBar() {
    return (
        <div>
            <Navbar className="navbar-dark" expand="md">
                <NavbarBrand href="/"><h2 className="mainTitle text-dark">Free Images</h2></NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem className="ml-2">
                        <a href="https://github.com/redasalmi"
                            rel="noopener noreferrer" target="_blank">
                            <span className="fab fa-github fa-3x github text-dark"></span>
                        </a>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;