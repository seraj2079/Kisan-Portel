import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_Member_registrationData } from '../Redux/Action';
import MemberDash from '../Component/MemberDash';
import '../../css/RegStyle.css';


const RegistrationReport = () => {

  // ================data call from store======================

  const { LoadMember_RegistrationDetail } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Load_Member_registrationData());
  }, [dispatch]);

let loadDataArry=[];
let load;


  // if(load){
    Object.keys(LoadMember_RegistrationDetail).map(key=>{
      Object.keys(LoadMember_RegistrationDetail[key]).map(key2=>{
        Object.keys(LoadMember_RegistrationDetail[key][key2]).map(key3=>{
          Object.keys(LoadMember_RegistrationDetail[key][key2][key3]).map(id=>{
            loadDataArry.push(LoadMember_RegistrationDetail[key][key2][key3][id]);
            // console.log("loadDataArry----------",loadDataArry);
            return(
                 (LoadMember_RegistrationDetail[key][key2][key3][id].registeredby === global.registered_membername)
        
            )
        })
      })
      })
    })
  // }


  return (
    <>
    <MemberDash/>
    <div className="container border border-danger mt-5 "
      style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
      <table className="container text-light mt-4">
        <thead>
          <tr className='text-center'>
            <td className='thead'>Sno</td>
            <td className='thead'>Shop Id</td>
            <td className='thead'>Name</td>
            <td className='thead'>Number</td>
            <td className='thead'>Crop Name</td>
            <td className='thead'>State</td>
            <td className='thead'>City</td>
            <td className='thead'>Area</td>
            <td className='thead'>Address</td>
            <td className='thead'>Pin Code</td>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(loadDataArry).map((id1, index) => {
              // console.log("loadDataArry--------",loadDataArry)
              return (
                <tr key={id1} className="text-center" scope="row">
                    <td className='tdata-regis'>{index + 1}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].shopid}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].farmer_name}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].number}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].crop_name}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].state_name}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].city_name}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].area_name}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].farmer_address}</td>
                    <td className='tdata-regis'>{loadDataArry[id1].area_pin}</td>
                </tr>
              );
            })
          }
        </tbody>

      </table>
    </div>
    </>
  )
}

export default RegistrationReport;
