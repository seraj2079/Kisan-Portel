import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from '../../firebase';
import logo from '../images/logo.jpeg';
import { Load_areaData, Load_StateData, Load_cityData, Load_registrationData, Load_adminData, loginOwner} from "../Redux/Action";
import { } from "../Redux/Action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import OwnerDash from"../Component/OwnerDash"
import Dashboard from "../Component/Dashboard";


let cityDataArray = [];
let areaDataArray = [];

const i = 0;
global.registered_contact = 0;
global.registered_contactid = 0;
global.registered_state = 0;
global.registered_city = 0;
global.registered_area = 0;
global.registered_ownername = 0;


const initialData = {
  number: "",
  pass: "",
  state_name: "",
  stateid: "",
  city_name: "",
  cityid: "",
  area_name: "",
  areaid: ""
}


const SignIn = () => {
  const [state, setstate] = useState(initialData);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [login,setLogin] =useState(false)
  const loginuser=[];
  const { Loadstate } = useSelector(state => state.cartreducer);
  const { Loadcity } = useSelector(state => state.cartreducer);
  const { Loadarea } = useSelector(state => state.cartreducer);
  const { Loaduserreg } = useSelector(state => state.cartreducer)
  const { Loadadmin_reg } = useSelector(state => state.cartreducer)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Load_StateData());
    dispatch(Load_cityData());
    dispatch(Load_areaData());
    dispatch(Load_adminData());
  }, []);

  const errors = {
    uname: "invalid username"
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  }


  cityDataArray = [];
  Object.keys(Loadcity).map((id, index) => {
    // console.log('citydata---------', cityDataArray)   
    if (state.state_name === Loadcity[id].state_name) {
      cityDataArray.push(Loadcity[id].city_name)
      // console.log('citydataArray-------------', cityDataArray)
    }
  })


  areaDataArray = [];
  Object.keys(Loadarea).map((id, index) => {
    if (state.city_name === Loadarea[id].city_name) {
      areaDataArray.push(Loadarea[id].area_name)
    }
  })


  const handleSubmit = (event) => {
   
    dispatch(Load_registrationData(state.state_name,state.city_name,state.area_name))
    dispatch(Load_adminData(state.state_name,state.city_name,state.area_name))

    event.preventDefault();
    var { uname, pass ,state_name,city_name,area_name} = document.forms[0];
    Object.keys(Loaduserreg).map((id, index) => {

      // Compare user info
      if (Loaduserreg) {
        if (
            Loaduserreg[id].state_name === state_name.value && 
            Loaduserreg[id].city_name === city_name.value && 
            Loaduserreg[id].area_name === area_name.value && 
            Loaduserreg[id].number === uname.value && 
            Loaduserreg[id].password === pass.value) {
          setIsSubmitted(true);
          global.registered_contact = Loaduserreg[id].number
          global.registered_contactid = Loaduserreg[id].password
          global.registered_state = Loaduserreg[id].state_name
          global.registered_city = Loaduserreg[id].city_name
          global.registered_area = Loaduserreg[id].area_name
          global.registered_ownername =Loaduserreg[id].farmer_name;
          alert('login', Loaduserreg[id].password);
          dispatch(loginOwner(Loaduserreg[id]));
          // dispatch(Load_registrationData(state.state_name,state.city_name,state.area_name));
        }

      }
      else {
        // Username not found
        alert('incorrect number')
        setErrorMessages({ name: "username", message: errors.username });
        alert("Incorrect Mobile Number");
      }

    }
    )

    Object.keys(Loadadmin_reg).map((id, index) => {

      // Compare user info
      if (Loadadmin_reg) {
        if (
            Loadadmin_reg[id].state_name === state_name.value && 
            Loadadmin_reg[id].city_name === city_name.value && 
            Loadadmin_reg[id].area_name === area_name.value && 
            Loadadmin_reg[id].number === uname.value && 
            Loadadmin_reg[id].password === pass.value) {
          setLogin(true);
          global.registered_contact = Loadadmin_reg[id].number
          global.registered_contactid = Loadadmin_reg[id].password
          global.registered_state = Loadadmin_reg[id].state_name
          global.registered_city = Loadadmin_reg[id].city_name
          global.registered_area = Loadadmin_reg[id].area_name
          alert('login', Loadadmin_reg[id].password);
          dispatch(Load_adminData(state.state_name,state.city_name,state.area_name));
        }

      }
      else {
        // Username not found
        alert('incorrect number')
        setErrorMessages({ name: "username", message: errors.username });
        alert("Incorrect Mobile Number");
      }

    }
    )

  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const renderForm=(
        <>
        <div className="container" style={{ marginTop: "150px" }}>
                <form onSubmit={handleSubmit} className="container border border-danger
            col-sm-offset-1 col-sm-4 mt-4"
                    style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>
                    <div className="mt-4">
                        <center><img src={logo} height="100" width="100" /></center>
                    </div>
                    <h3 className="text-center text-warning ">
                        SignIn
                    </h3>
                    <div className="container mb-4 text-danger">
                        <select onChange={handleChange} className="form-control" name="state_name">
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
                        <select onChange={handleChange} className="form-control mb-4" name="city_name">
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
                        <select onChange={handleChange} className="form-control mb-4" name="area_name">
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
                    <div className="container mb-4">
                        <input
                            type="number"
                            maxLength="10"
                            name="uname"
                            className="form-control"
                            placeholder="Enter mobile number"
                             />
                             {renderErrorMessage("uname")}
                    </div>
                    <div className="container mb-4">
                        <input
                            type="password"
                            name="pass"
                            className="form-control"
                            placeholder="Enter password"
                            />
                            {renderErrorMessage("pass")}
                    </div>
                    <div className="container text-center">
                        <button
                            type="submit"
                            className="btn btn-warning text ">
                            SignIn
                        </button>
                    </div>
                    <h6 className="text-center text-warning mb-4 " style={{ marginLeft: "180px" }}>
                        <NavLink to="member_login">
                            <label>Register</label>
                        </NavLink>
                    </h6>

                </form>
            </div>
        </>
    );
    return (
        <div>
        {
          isSubmitted ?
            <div>
              {
                <OwnerDash/>
              }
            </div>
            :
            login ?
            <div>
              {
                <Dashboard/>
              }
            </div>
            :
            <div className="app">
              <div className="login-form">
                {renderForm}
              </div>
            </div>
        }
      </div>
    )
}

export default SignIn;

// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import shortid from "shortid";
// import database from '../../firebase';
// import logo from '../images/logo.jpeg';
// import { Load_areaData, Load_StateData, Load_cityData, Load_registrationData} from "../Redux/Action";
// import { } from "../Redux/Action";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import OwnerDash from"../Component/OwnerDash"
// import Dashboard from "../Component/Dashboard";


// let cityDataArray = [];
// let areaDataArray = [];

// const initialData = {
//   contact: "",
//   pass: "",
//   state_name: "",
//   stateid: "",
//   city_name: "",
//   cityid: "",
//   area_name: "",
//   areaid: ""
// }


// const SignIn = () => {
//   const [state, setstate] = useState(initialData);
//   const [loginSuccess,setLoginSuccess] =useState(false)
//   const { Loadstate } = useSelector(state => state.cartreducer);
//   const { Loadcity } = useSelector(state => state.cartreducer);
//   const { Loadarea } = useSelector(state => state.cartreducer);
//   const { Loaduserreg } = useSelector(state => state.cartreducer);
//   const {id}=useParams();
//   let matchid=id;


//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(Load_registrationData(state.state_name,state.city_name,state.area_name));
    
//   }, [state.state_name,state.city_name,state.area_name]);
//   useEffect(
//     ()=>{
//       dispatch(Load_StateData());
//       dispatch(Load_cityData());
//       dispatch(Load_areaData());
//     }
//   ,[]);

//   const{state_name,stateid}=state;
//   const{city_name,cityid}=state;
//   const{area_name,areaid}=state;
//   const{contact,pass}=state;


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setstate({ ...state, [name]: value });
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     Object.keys(Loaduserreg).map((id,index)=>{
//       if(state.state_name === Loaduserreg[id].state_name &&
//          state.city_name === Loaduserreg[id].city_name &&
//          state.area_name === Loaduserreg[id].area_name &&
//          state.contact === Loaduserreg[id].number &&
//          state.pass === Loaduserreg[id].password
//         )

//         {
//           setLoginSuccess(true);
//           alert("Login Success")
//         }
//         else{
//           alert("Plese check information")
//         }
//     })
//   }

//   if(state.state_name)
//   {
//     Object.keys(Loadstate).map((id,index)=>{
//       if(state.state_name===Loadstate[id].state_name)
//       {
//         state.stateid=Loadstate[id].stateid;
//       }
//     })
//   }

//   if(state.city_name)
//   {
//     Object.keys(Loadcity).map((id,index)=>{
//       if(state.city_name===Loadcity[id].city_name)
//       {
//         state.cityid=Loadcity[id].cityid;
//       }
//     })
//   }

//   if(state.area_name)
//   {
//     Object.keys(Loadarea).map((id,index)=>{
//       if(state.area_name===Loadarea[id].area_name)
//       {
//         state.areaid=Loadarea[id].areaid;
//       }
//     })
//   }

//   cityDataArray = [];
//   Object.keys(Loadcity).map((id, index) => {   
//     if (state.state_name === Loadcity[id].state_name)
//     {
//       cityDataArray.push(Loadcity[id].city_name)
//     }
//   })

//   areaDataArray = [];
//   Object.keys(Loadarea).map((id, index) => {
//     if (state.city_name === Loadarea[id].city_name)
//     {
//       areaDataArray.push(Loadarea[id].area_name)
//     }
//   })


//      return(
//         <>{
//           loginSuccess ? <><Dashboard/></>:
//         <>
//         <div className="container" style={{ marginTop: "150px" }}>
//                 <form onSubmit={handleSubmit} className="container border border-danger
//             col-sm-offset-1 col-sm-4 mt-4"
//                     style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>
//                     <div className="mt-4">
//                         <center><img src={logo} height="100" width="100" /></center>
//                     </div>
//                     <h3 className="text-center text-warning ">
//                         SignIn
//                     </h3>
//                     <div className="container mb-4 text-danger">
//                         <select onChange={handleChange} className="form-control" name="state_name" value={state_name||""}>
//                             <option>Select State Name</option>
//                             {
//                                 Object.keys(Loadstate).map((id, index) => {
//                                     return (
//                                         <option>{Loadstate[id].state_name}</option>
//                                     )
//                                 })
//                             }

//                         </select>
//                     </div>
//                     <div className="container mb-4 text-danger">
//                         <select onChange={handleChange} className="form-control mb-4" name="city_name" value={city_name||""}>
//                             <option selected>Select City Name</option>
//                             {
//                                 Object.keys(cityDataArray).map((id, index) => {
//                                     return (
//                                         <option>{cityDataArray[id]}</option>
//                                     )
//                                 })
//                             }

//                         </select>
//                     </div>
//                     <div className="container mb-4 text-danger">
//                         <select onChange={handleChange} className="form-control mb-4" name="area_name" value={area_name||""}>
//                             <option selected>Select Area Name</option>
//                             {
//                                 Object.keys(areaDataArray).map((id, index) => {
//                                     return (
//                                         <option>{areaDataArray[id]}</option>
//                                     )
//                                 })
//                             }

//                         </select>
//                     </div>
//                     <div className="container mb-4">
//                         <input
//                             type="number"
//                             name="contact"
//                             value={contact||""}
//                             className="form-control"
//                             placeholder="Enter mobile number"
//                             onChange={handleChange}
//                              />
//                     </div>
//                     <div className="container mb-4">
//                         <input
//                             type="password"
//                             name="pass"
//                             value={pass||""}
//                             className="form-control"
//                             placeholder="Enter password"
//                             onChange={handleChange}
//                             />
//                     </div>
//                     <div className="container text-center">
//                         <button
//                             type="submit"
//                             className="btn btn-warning text ">
//                             SignIn
//                         </button>
//                     </div>
//                     <h6 className="text-center text-warning mb-4 " style={{ marginLeft: "180px" }}>
//                         <NavLink to="member_login">
//                             <label>Register</label>
//                         </NavLink>
//                     </h6>

//                 </form>
//             </div>
//         </>
//       }
//       </>
//     );
// }
    

// export default SignIn;