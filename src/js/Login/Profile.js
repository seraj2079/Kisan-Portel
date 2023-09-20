import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import logo from '../images/logo.jpeg';


const Profile = () => {


    return (
        <>
            <div className="container" style={{ marginTop: "150px" }}>
                <form className="container border border-danger
            col-sm-offset-1 col-sm-3 mt-4"
                    style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>
                    <div className="mt-4">
                        <center><img src={logo} height="100" width="100" /></center>
                    </div>
                    <h3 className="text-center text-warning ">
                        Profile
                    </h3>
                    <div className="container mb-4">
                        <input
                            type="text"
                            name="member_name"
                            className="form-control"
                            placeholder="Enter name"
                            required />
                    </div>
                    <div className="container mb-4">
                        <input
                            type="text"
                            name="member_number"
                            className="form-control"
                            placeholder="Enter Number"
                            required />
                    </div>
                    <div className="container mb-4">
                        <input
                            type="text"
                            name="member_address"
                            className="form-control"
                            placeholder="Enter Address"
                            required />
                    </div>
                    <div className="container mb-4">
                        <input
                            type="file"
                            name="member_img"
                            className="form-control"
                            placeholder="Select image"
                            required />
                    </div>
                    <div className="container text-center mb-4">
                        <Button
                            type="submit"
                            className="btn btn-warning text ">
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Profile;