import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../images/logo.jpeg'
import'../../css/Dashboardcss.css';
import { NavLink } from 'react-router-dom';

const OwnerDash = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#0b0b45" }}>
                <img className='rounded-circle border border-light m-2' src={logo} height="100" width="100"/>
                <Navbar.Brand className='text-light m-2'>
                    Kisan
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' style={{ background: '#ff0000', marginRight: '10px' }} />
                <Navbar.Collapse id='responsive-navbar--nav'>
                    <Nav className='mr-auto'>
                        
                        <NavDropdown title="Item Detail" id='nav-dropdown-title'>
                            <NavDropdown.Item>
                                <NavLink to="/add_item">
                                    <label>Add Item</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/manage_item">
                                    <label>Manage Item</label>
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavLink to="/" className=' m-2' id='nav-dropdown-title'>
                           <label> Logout </label>
                        </NavLink>


                    </Nav>

                </Navbar.Collapse>


            </Navbar>
        </>
    )
}

export default OwnerDash;
