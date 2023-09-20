import React from 'react'
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../images/logo.jpeg';
import'../../css/Dashboardcss.css';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#0b0b45" }}>
                <img className='rounded-circle border border-light m-2' src={logo} height="100" width="100"/>
                <Navbar.Brand className='text-light m-2'>
                    Kisan
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' style={{ background: '#ff0000', marginRight: '10px',float:'right' }} />
                <Navbar.Collapse id='responsive-navbar--nav'>
                    <Nav className='mr-auto'>
                        <NavLink className=' m-2' id='nav-dropdown-title'>
                           <label> Home </label>
                        </NavLink>
                        <NavDropdown title="location" id='nav-dropdown-title'>
                            <NavDropdown.Item>
                                <NavLink to="/stateregis">
                                    <label>State</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/cityregis">
                                    <label>City</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/arearegis">
                                    <label>Area</label>
                                </NavLink>
                            </NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="report" id='nav-dropdown-title'>
                            <NavDropdown.Item>
                                <NavLink to="/state_report">
                                    <label>State Report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/city_report">
                                    <label>City Report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/area_report">
                                    <label>Area Report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/regis_report" >
                                    <label>Owner Report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/crop_report">
                                    <label>Crop Report</label>
                                </NavLink>
                            </NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="component" id='nav-dropdown-title'>
                        <NavDropdown.Item>
                                <NavLink to="/add_crop">
                                    <label>Crop Type</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/member_registration">
                                    <label>Member Registration</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/member_report">
                                    <label>Member Report</label>
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

export default Dashboard;
