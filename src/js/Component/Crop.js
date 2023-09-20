import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import database from "../../firebase";
import shortid from "shortid";
import Dashboard from "./Dashboard";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_cropData } from '../Redux/Action';
import CropReport from '../Report/CropReport';



const crop_data = {
    crop_name: "",
    cropid:""
}


const Crop = () => {

    const [state, setState] = useState(crop_data);
    const [register, setRegister] = useState(false);
    const [update, setUpdate] = useState(false);
    const {id}=useParams();
    let matchid = id;
    const { Loadcrop } = useSelector(state => state.cartreducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Load_cropData());
        Object.keys(Loadcrop).map((id, index) => {
            if (matchid === id) {
                setState({ ...Loadcrop[id] })
            }
        })
    },[]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }



    const handleSubmit = (e) => {

        const idData = shortid.generate();
        state.cropid = idData;
        

        if (id) {
            loadupdateData()
        }
        else {
            dataInsert()
        }
        e.preventDefault();
    }


        const dataInsert = () => {
        database.ref("crop_table").push(state, (err) => {
            if (err) {
                alert("Crop not register");
            }
            else {
                alert("Crop register");
                setRegister(true);
            }
        });
      }

    let myfordata = "";
    const loadupdateData = () => {
        state.cropid=cropid;
        if (myfordata !== null) {

            updateData();

        }
    }


    const updateData = () => {
        database.ref(`crop_table/${id}`).set(state, (err) => {
            if (err) {
                alert("Crop not update");
            }
            else {
                alert("Crop updated");
                setUpdate(true);
            }
        })
    }



    const { crop_name,cropid } = state;
    return (
        <>
        {
            register ? <><Dashboard/></> :

            update ? <><CropReport/></>:
        <>
        <Dashboard/>
            <div className="container" style={{ marginTop: "150px" }}>
                <form onSubmit={handleSubmit} className="container border border-dangercol-sm-offset-1 col-sm-4 mt-4"
                    style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>
                    <h3 className="text-center text-danger ">
                        Crop Registration
                    </h3>
                    <div className="container mb-4">
                        <input
                            type="text"
                            name="crop_name"
                            value={crop_name || ""}
                            className="form-control"
                            placeholder="Enter Crop Name"
                            onChange={handlechange}
                        />
                    </div>
                    <div className="container text-center">
                        <Button
                            type="submit"
                            className="btn btn-warning text ">
                            {id ? "update" : "register"}
                        </Button>
                    </div>

                </form>
            </div>
        </>
        }
        </>
    );
}

export default Crop;