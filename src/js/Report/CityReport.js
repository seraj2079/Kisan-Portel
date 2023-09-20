import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_cityData } from '../Redux/Action';
import { Button } from 'react-bootstrap';
import database from '../../firebase';
import Dashboard from '../Component/Dashboard';
import { Link } from 'react-router-dom';
import "../../css/CityStyle.css";


const CityReport = () => {

  // ===========data call from store==============

  const { Loadcity } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Load_cityData());
  }, []);

  // console.log("City Data----", Loadcity)

  // ==============Delete Section============

  const onDelete = (id) => {

    database.ref(`city_table/${id}`).remove((err) => {
      if (err) {
        alert("data not deleted");
      }
      else {
        alert("data deleted");
      }
    })
  }

  return (
    <>
    <Dashboard/>
    <div className="container border border-danger mt-5 "
      style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
      <table className="container text-light mt-4">
        <thead>
          <tr className='text-center'>
            <td className='thead'>Sno</td>
            <td className='thead'>State Id</td>
            <td className='thead'>State Name</td>
            <td className='thead'>City Id</td>
            <td className='thead'>City Name</td>
            <td className='thead'>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(Loadcity).map((id, index) => {
              return (
                <tr key={id} className="text-center">
                  <td scope='row' className='tdata-city'>{index + 1}</td>
                  <td className='tdata-city'>{Loadcity[id].stateid}</td>
                  <td className='tdata-city'>{Loadcity[id].state_name}</td>
                  <td className='tdata-city'>{Loadcity[id].cityid}</td>
                  <td className='tdata-city'>{Loadcity[id].city_name}</td>
                  <td className='tdata-city'>
                    <Link to={`/edit_CityReport/${id}`}>
                    <Button className='m-2 btn btn-warning text text-light' >Edit</Button>
                    </Link>
                    <Button className='m-2 btn btn-danger text text-light' onClick={() => onDelete(id)} >Delete</Button>
                  </td>
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

export default CityReport;
