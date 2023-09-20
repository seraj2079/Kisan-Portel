import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from "../../firebase";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_StateData, Load_cityData } from '../Redux/Action';
import AreaRegis from "./AreaRegis";
import Dashboard from "../Component/Dashboard";
import { useParams } from "react-router-dom";
import CityReport from "../Report/CityReport";




const initialData = {
    state_name: "",
    stateid: "",
    city_name: "",
    cityid: ""
}
const CityRegis = () => {

    // ===========data call from store===========

    const [state, setState] = useState(initialData);
    const [register, setRegister] = useState(false);
    const [update, setUpdate] = useState(false);
    const { id } = useParams();
    let matchid = id;


    const { Loadstate } = useSelector(state => state.cartreducer);
    const { Loadcity } = useSelector(state => state.cartreducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Load_StateData());
        Object.keys(Loadstate).map((id, index) => {
            if (matchid === id) {
                setState({ ...Loadstate[id] })
            }
        })
        dispatch(Load_cityData());
        Object.keys(Loadcity).map((id, index) => {
            if (matchid === id) {
                setState({ ...Loadcity[id] })
            }
        })

    }, [id]);

    // =========data submit on database==========

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        const idData = shortid.generate();
        state.cityid = idData;
        state.stateid = stateid;
        

        if (id) {
            loadupdateData()
        }
        else {
            dataInsert()
        }
        e.preventDefault();
    }

        const dataInsert = () => {
            database.ref("city_table").push(state, (err) => {
                if (err) {
                    alert("City is not register");
                }
                else {
                    alert("City is register");
                    setRegister(true);
                }

            })
        }
    

    let myfordata = "";
    const loadupdateData = () => {
        state.cityid = cityid;
        if (myfordata !== null) {

            updateData();

        }
    }

    const updateData = () => {
        database.ref(`city_table/${id}`).set(state, (err) => {
            if (err) {
                alert("City not update");
            }
            else {
                alert("City updated");
                setUpdate(true);
            }
        })
    }




    // ==========stste id call==========

    if (state.state_name) {
        Object.keys(Loadstate).map((id, index) => {
            if (state.state_name === Loadstate[id].state_name) {
                state.stateid = Loadstate[id].stateid;
            }
        })
    }

    const { city_name, cityid } = state;
    const { state_name, stateid } = state;


    return (
        <>
            {
                register ? <><AreaRegis /></> :
                update ?<><CityReport/></> :
                    <>
                        <Dashboard />
                        <div className="container" style={{ marginTop: "170px" }}>
                            <form onSubmit={handleSubmit}
                                className="container border border-danger col-sm-offset-2 col-sm-4 mt-4"
                                style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
                                <h3 className="text-center text-danger">City Registration</h3>
                                <div className="container mb-4">
                                    <select className="form-control" onChange={handleChange} name="state_name" value={state_name || ""}>
                                        <option>Select State</option>
                                        {
                                            Object.keys(Loadstate).map((id, index) => {
                                                return (
                                                    <option>{Loadstate[id].state_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="container mb-3">
                                    <input
                                        type="text"
                                        name="city_name"
                                        value={city_name || ""}
                                        className="form-control"
                                        onChange={handleChange}
                                        placeholder="Enter City" />
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
            }
        </>
    );

}
export default CityRegis;