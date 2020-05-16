import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'; 

class NavBar extends React.Component {
    render() {
        return (
            <Router>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink href="#home">Home</NavLink>
                    </Nav>
                </Navbar>
            </Router>
            
        )
    }
}

export default NavBar;