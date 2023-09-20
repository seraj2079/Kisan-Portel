import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from "../../firebase";
import CityRegis from "./CityRegis";
import Dashboard from "../Component/Dashboard";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_StateData } from '../Redux/Action';
import StateReport from '../Report/StateReport';



const initialData = {
    state_name: "",
    stateid: ""
}

const StateRegis = () => {
    const [state, setState] = useState(initialData);
    const [register, setRegister] = useState(false);
    const [update, setUpdate] = useState(false);
    const { id } = useParams();
    let matchid = id;
    

    const { Loadstate } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Load_StateData());
        Object.keys(Loadstate).map((id, index) => {
            if (matchid === id) {
                setState({ ...Loadstate[id] })
            }
        })
    },[id]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        
        const idData = shortid.generate();
        state.stateid = idData;
        

    
        
        if (id) {
            loadupdateData()
        }
        else {
            dataInsert()
        }

        e.preventDefault();
    
    }
        const dataInsert = () => {
            database.ref("state_table").push(state, (err) => {
                if (err) {
                    alert("State is not register");
                }
                else {
                    alert("State is register");
                    setRegister(true);
                }
            })
        }



    let myfordata = "";
    const loadupdateData = () => {
        state.stateid= stateid;
        if (myfordata !== null) {

            updateData();

        }
    }


    const updateData = () => {
        database.ref(`state_table/${id}`).set(state, (err) => {
            if (err) {
                alert("State not update");
            }
            else {
                alert("State updated");
                setUpdate(true);
            }
        })
    }
   

    const { state_name,stateid } = state;
    return (
        <>{
            register ? <><CityRegis /></> :
            update ?<><StateReport/></> :
                <>
                    <Dashboard />
                    <div className="container" style={{ marginTop: "170px" }}>
                        <form onSubmit={handleSubmit}
                            className="container border border-danger col-sm-offset-2 col-sm-4 mt-4"
                            style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>

                            <h3 className="text-center text-danger">State Registration</h3>

                            <div className="container mb-3">
                                <input
                                    type="text"
                                    name="state_name"
                                    value={state_name || ""}
                                    className="form-control"
                                    onChange={handleChange}
                                    placeholder="Enter State" />
                            </div>

                            <div className="container text-center">
                                <button
                                    type="submit"
                                    className="btn btn-warning text mb-4">
                                    {id ? "update" : "register"}

                                </button>
                            </div>
                        </form>
                    </div>
                </>
        }</>
    );

}
export default StateRegis;