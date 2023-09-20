import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_StateData, Load_areaData, Load_cityData, Load_cropData, Load_registrationData, Load_RegistrationImage, Load_memberData } from '../Redux/Action';
import database from '../../firebase';
import shortid from 'shortid';
import FileResizer from 'react-image-file-resizer';
import MemberDash from './MemberDash';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdminDash from './AdminDash';





const initData = {
    number: "",
    farmer_name: "",
    crop_name: "",
    cropid: "",
    state_name: "",
    stateid: "",
    city_name: "",
    cityid: "",
    area_name: "",
    areaid: "",
    farmer_address: "",
    area_pin: "",
    password: "",
    shopid: "",
    registeredby:""
}

const initImgData = {
    imgdata: "",
    shopid: ""

}


let cityDataArray = [];
let areaDataArray = [];
let myfordata=""

const Registration = () => {

    const [state, setState] = useState(initData);
    const [userimg,setUserImg] = useState(initImgData);
    const [register, setRegister] = useState(false);
    const [update,setUpdate]= useState(false);
    const {id}=useParams();
    let matchid=id;
    
    const {LoadMember_Detail} =useSelector(state=>state.cartreducer);
    const { Loadstate } = useSelector(state => state.cartreducer);
    const { Loadcity } = useSelector(state => state.cartreducer);
    const { Loadarea } = useSelector(state => state.cartreducer);
    const { Loadcrop } = useSelector(state => state.cartreducer);
    const {Loaduserreg} = useSelector(state => state.cartreducer);
    const {Loaduserreg_img} = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(Load_StateData());
        dispatch(Load_cityData());
        dispatch(Load_areaData());
        dispatch(Load_cropData());
        dispatch(Load_memberData());
    },[])

    useEffect(()=>{
        setState({...Loaduserreg[matchid]});
        if(matchid){
            Object.keys(Loaduserreg_img[Loaduserreg[matchid].number]).map((id,index)=>{
                global.imgid=id;
                setUserImg({...(Loaduserreg_img[Loaduserreg[matchid].number])[id]});
            })
    
            
        }
    },[matchid]);

    
// console.log("userimg=========",userimg);
    
    const handlechange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }


    const handleSubmit = (e) => {

        const idData = shortid.generate();
        state.shopid = idData;
        userimg.shopid = idData;
        state.password = idData;
        state.stateid=stateid;
        state.cityid=cityid;
        state.areaid=areaid;


        if(id){
            loadupdateData()
        }
        else{
            dataInsert()
        }
        e.preventDefault();
    }

        const loadupdateData = () =>{
            state.shopid=shopid;
            userimg.shopid = shopid;
            if (myfordata !==null){
                userimg.imgdata=myfordata;
                updateData();
            }
            else{
                userimg.imgdata = imgdata;
                updateData();
            }
        }

        let mob_number = state.number;
        let stnm = state.state_name;
        let ctnm = state.city_name;
        let arnm = state.area_name;


    const updateData = () =>{
        database.ref(`user_reg/${stnm}/${ctnm}/${arnm}/${id}`).set(state, (err) => {
            if (err) {
                alert("Update Unsuccessful");
            }
            else {
                database.ref(`user_reg_img/${stnm}/${ctnm}/${arnm}/${mob_number}/${global.imgid}`).set(userimg);
                alert("Update Successful");
                setUpdate(true);
            }
    
    
        });
    }

    // let loadDataArray=[];
    // {
    //     Object.keys(Loaduserreg).map((id1,index1)=>{
    //         Object.keys(Loaduserreg[id1]).map((id2,index2)=>{
    //             loadDataArray.push(Loaduserreg[id1][id2]);
    //         })
    //     })
    // }

    const dataInsert =()=>{
        state.registeredby =LoadMember_Detail.member_name;
        database.ref(`user_reg/${stnm}/${ctnm}/${arnm}`).push(state, (err) => {
            if (err) {
                alert("Registration Unsuccessful");
            }
            else {
                database.ref(`user_reg_img/${stnm}/${ctnm}/${arnm}/${mob_number}`).push(userimg);
                alert("Registration Successful" + state.password);
                setRegister(true);
                setState({...initData});
                setUserImg({...initImgData});
            }
        });
    }

    // ================filter===========

    cityDataArray = [];
    Object.keys(Loadcity).map((id, index) => {
        if (state.state_name === Loadcity[id].state_name) {
            cityDataArray.push(Loadcity[id].city_name)
        }
    })

    areaDataArray = [];
    Object.keys(Loadarea).map((id, index) => {
        if (state.city_name === Loadarea[id].city_name) {
            areaDataArray.push(Loadarea[id].area_name)
        }
    })

    // ============id gen =============

    if (state.state_name) {
        Object.keys(Loadstate).map((id, index) => {
            if (state.state_name === Loadstate[id].state_name) {
                state.stateid = Loadstate[id].stateid;
            }
        })
    }


    if (state.city_name) {
        Object.keys(Loadcity).map((id, index) => {
            if (state.city_name === Loadcity[id].city_name) {
                state.cityid = Loadcity[id].cityid;
            }
        })
    }

    if (state.area_name) {
        Object.keys(Loadarea).map((id, index) => {
            if (state.area_name === Loadarea[id].area_name) {
                state.areaid = Loadarea[id].areaid;
            }
        })
    }

    if (state.crop_name) {
        Object.keys(Loadcrop).map((id, index) => {
            if (state.crop_name === Loadcrop[id].crop_name) {
                state.cropid = Loadcrop[id].cropid;
            }
        })
    }

    //  ==========image =============

    const imageLoad = (e) => {

        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                FileResizer.imageFileResizer(
                    e.target.files[0],
                    300,
                    300,
                    "JPEG",
                    200,
                    0,
                    (uri) => {
                        myfordata =uri;
                        userimg.imgdata = uri;
                    },
                    "base64",
                    300,
                    300
                );
            }
            catch (err) {
                console.log("error in image section");
            }
        }
    }

    const {state_name,stateid}=state;
    const {city_name,cityid}=state;
    const {area_name,areaid}=state;
    const {shopid}=state;
    const {farmer_name,farmer_address,area_pin,number,crop_name}=state;
    const {imgdata}=userimg;


    return (
        <>
            {
                register ? <><MemberDash /></> :
                update ?<><AdminDash/></> :
                    <>
                        <div>
                        {
                             global.registered_contact==="7415359315" ? <Dashboard/>:<MemberDash/>
                        }
                       </div>

                        <div className="container" style={{ marginTop: "50px" }}>
                            <form onSubmit={handleSubmit} className="container border border-danger
                                 col-sm-offset-2 col-sm-3 mt-4"
                                style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>

                                <h3 className="text-center text-danger ">
                                    Registration
                                </h3>

                                <div className="container mb-4 text-danger">
                                    <label>Mobile Number</label>
                                    <input
                                        type="number"
                                        name="number"
                                        value={number ||""}
                                        className="form-control"
                                        placeholder="Enter Number"
                                        onChange={handlechange}
                                    />
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>Farmer Name</label>
                                    <input
                                        type="text"
                                        name="farmer_name"
                                        value={farmer_name ||""}
                                        className="form-control"
                                        placeholder="Enter name"
                                        onChange={handlechange}
                                    />
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>Farmer logo</label>
                                    <input
                                        type="file"
                                        name="imgdata"
                                        className="form-control"
                                        placeholder="Select image"
                                        onChange={imageLoad}
                                    />
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>Crop Type</label>
                                    <select onChange={handlechange} className="form-control" name="crop_name" value={crop_name ||""}>
                                        <option>Select Crop </option>
                                        {
                                            Object.keys(Loadcrop).map((id, index) => {
                                                return (
                                                    <option>{Loadcrop[id].crop_name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>State Name</label>
                                    <select onChange={handlechange} className="form-control" name="state_name" value={state_name ||""}>
                                        <option>Select State Name</option>
                                        {
                                            Object.keys(Loadstate).map((id, index) => {
                                                return (
                                                    <option>{Loadstate[id].state_name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>City Name</label>
                                    <select onChange={handlechange} className="form-control mb-4" name="city_name" value={city_name ||""}>
                                        <option selected>Select City Name</option>
                                        {
                                            Object.keys(cityDataArray).map((id, index) => {
                                                return (
                                                    <option>{cityDataArray[id]}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>Area Name</label>
                                    <select onChange={handlechange} className="form-control mb-4" name="area_name" value={area_name ||""}>
                                        <option selected>Select Area Name</option>
                                        {
                                            Object.keys(areaDataArray).map((id, index) => {
                                                return (
                                                    <option>{areaDataArray[id]}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>


                                <div className="container mb-4 text-danger">
                                    <label>Farmer Address</label>
                                    <input
                                        type="text"
                                        name="farmer_address"
                                        value={farmer_address ||""}
                                        className="form-control"
                                        placeholder="Enter Address"
                                        onChange={handlechange}
                                    />
                                </div>

                                <div className="container mb-4 text-danger">
                                    <label>Farmer Area Pincode</label>
                                    <input
                                        type="pin"
                                        name="area_pin"
                                        value={area_pin ||""}
                                        className="form-control"
                                        onChange={handlechange}
                                        maxLength="6"
                                    />
                                </div>

                                <div className="container text-center mb-4">

                                    <Button
                                        type="submit"
                                        className="btn btn-success text ">
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

export default Registration;