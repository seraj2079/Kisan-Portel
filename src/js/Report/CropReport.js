import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_cropData } from '../Redux/Action';
import { Button } from 'react-bootstrap';
import database from '../../firebase';
import Dashboard from '../Component/Dashboard';
import { Link } from 'react-router-dom';
import "../../css/CropStyle.css";


const CropReport = () => {

  // ================data call from store======================

  const { Loadcrop } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Load_cropData());
  }, []);

  // console.log("State Data----", Loadcrop)

  // ===================delete section=============

  const onDelete = (id) => {

    database.ref(`crop_table/${id}`).remove((err) => {
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
    <div className="container border border-danger mt-5"
      style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
      <table className="container text-light mt-4">
        <thead>
          <tr className='text-center'>
            <td className='thead'>Sno</td>
            <td className='thead'>Crop Id</td>
            <td className='thead'>Crop name</td>
            <td className='thead'>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(Loadcrop).map((id, index) => {
              return (
                <tr key={id} className="text-center">
                  <td scope='row' className='tdata-crop'>{index + 1}</td>
                  <td className='tdata-crop'>{Loadcrop[id].cropid}</td>
                  <td className='tdata-crop'>{Loadcrop[id].crop_name}</td>
                  <td className='tdata-crop'>
                    <Link to={`/edit_CropReport/${id}`}>
                    <Button className='m-2 btn btn-warning text text-light'>Edit</Button>
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

export default CropReport;
