import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../css/Dashboardcss.css';
import { Load_areaData, Load_cityData, Load_StateData } from '../Redux/Action';
import { useSelector, useDispatch } from 'react-redux';
import { Load_registrationData, Load_RegistrationImage } from '../Redux/Action';
import database from '../../firebase';
import { Button } from 'react-bootstrap';
import Dashboard from './Dashboard';
import '../../css/OwnerStyle.css';

let cityDataArray = [];
let areaDataArray = [];





const initData = {
  state_name: "",
  stateid: "",
  city_name: "",
  cityid: "",
  area_name: "",
  areaid: "",

}
const OwnerReport = () => {

  const [state, setState] = useState(initData);

  const { Loadstate } = useSelector(state => state.cartreducer);
  const { Loadcity } = useSelector(state => state.cartreducer);
  const { Loadarea } = useSelector(state => state.cartreducer);
  const { Loaduserreg } = useSelector(state => state.cartreducer);
  const { Loaduserreg_img } = useSelector(state => state.cartreducer);

  let loadDataArray=[];
  {
    Object.keys(Loaduserreg).map((id1,index)=>{
      Object.keys(Loaduserreg[id1]).map((id2, index2)=>{
        loadDataArray.push(Loaduserreg[id1][id2]);
      })
    })
  }
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(Load_StateData());
    dispatch(Load_cityData());
    dispatch(Load_areaData());
    dispatch(Load_registrationData());
    dispatch(Load_RegistrationImage());
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }


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

  const onDelete = (id1, stnm, ctnm, arnm, mob_number, id2) => {
    database.ref(`user_reg/${stnm}/${ctnm}/${arnm}/${id1}`).remove((err) => {
      if (err) {
        alert("data not deleted");
      }
      else {
        
        database.ref(`user_reg_img/${stnm}/${ctnm}/${arnm}/${mob_number}/${id2}`).remove();
        alert("data deleted");
      }
    })
  }

  // console.log("Loaduserreg=========", Loaduserreg)

  const handleSubmit = (e) => {
    dispatch(Load_registrationData(state.state_name, state.city_name, state.area_name));
    dispatch(Load_RegistrationImage(state.state_name, state.city_name, state.area_name));
  }

  const imageLoad =(id,mob_number)=>(
    Object.keys(Loaduserreg_img[mob_number]).map((id1,index)=>{
      global.imgData=Loaduserreg_img[mob_number][id1].imgdata;
      return(
        <img src={global.imgData} height="40" width="40"/>
      )
    })
  )
  return (
    <>

      <Dashboard />

      <div className='container ' style={{ marginTop: "50px" }}>
        <div className='row'>
          <div className="container mb-3 col-sm-3 ">
            <label className='text-danger'>State Name</label>
            <select class="form-control mb-3" name="state_name" onChange={handleChange} >
              <option selected> Select State Name</option>
              {
                Object.keys(Loadstate).map((id, index) => {
                  return (
                    <option>{Loadstate[id].state_name}</option>
                  )


                })
              }
            </select>

          </div>


          <div className="container mb-3 col-sm-3">
            <label className='text-left text-danger'>City Name</label>
            <select class="form-control mb-3" name="city_name" onChange={handleChange}>
              <option selected> Select City Name</option>
              {
                Object.keys(cityDataArray).map((id, index) => {
                  return (
                    <option>{cityDataArray[id]}</option>
                  )


                })
              }
            </select>

          </div>

          <div className="container mb-3 col-sm-3">
            <label className='text-danger'>Area</label>
            <select class="form-control mb-3" name="area_name" onChange={handleChange} >
              <option selected> Select area</option>
              {
                Object.keys(areaDataArray).map((id, index) => {
                  return (
                    <option>{areaDataArray[id]}</option>
                  )


                })
              }
            </select>
          </div>

          <div className="container mb-3 col-sm-3" style={{ marginTop: "24px" }}>
            <Button
              type="button"
              className="btn btn-success text bnt-center"
              onClick={() => {
                handleSubmit()
              }}
            >
              Search
            </Button>
          </div>

        </div>
      </div>
      <h3 className="text-center text-danger">Registration Detail</h3>
      <div className="container border border-danger "
        style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
        <table className="container text-light mt-4">
          <thead>
            <tr className='text-center'>
              <td className='thead'>Sno</td>
              <td className='thead'>Id</td>
              <td className='thead'>Mobile Number</td>
              <td className='thead'>College Name</td>
              <td className='thead'>Type</td>
              <td className='thead'>State Name</td>
              <td className='thead'>City Name</td>
              <td className='thead'>Area Name</td>
              <td className='thead'>College Address</td>
              <td className='thead'>Pincode</td>
              <td className='thead'>Image</td>
              <td className='thead'>Action</td>
            </tr>
          </thead>
          <tbody>
            {((Loaduserreg.length !=0 && Loaduserreg_img.length !=0)) ?<>{
              Object.keys(Loaduserreg).map((id1, index1) => {
                return (
                  <tr key={[id1]} className="text-center" scope="row">
                    <td className='tdata-Owner'>{index1 + 1}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].shopid}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].farmer_name}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].number}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].crop_name}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].state_name}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].city_name}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].area_name}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].farmer_address}</td>
                    <td className='tdata-Owner'>{Loaduserreg[id1].area_pin}</td>
                    <td className='tdata-Owner'>{imageLoad(Loaduserreg[id1].id,Loaduserreg[id1].number)}</td>
                    <td className='tdata-Owner'>
                      <Link to={`/edit_OwnerReport/${id1}`}>
                        <button className='m-2 btn btn-warning text text-light'>Edit</button>
                      </Link>
                      <button className='m-2 btn btn-danger text text-light'
                        onClick={() => onDelete(id1,Loaduserreg[id1].state_name, Loaduserreg[id1].city_name, Loaduserreg[id1].area_name, Loaduserreg[id1].mob_number)} >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            }</>:
            <>Pls Load</>
          }

          </tbody>

        </table>
      </div>
    </>
  )

}
export default OwnerReport;