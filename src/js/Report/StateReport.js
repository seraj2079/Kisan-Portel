import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_StateData } from '../Redux/Action';
import { Button } from 'react-bootstrap';
import database from '../../firebase';
import Dashboard from '../Component/Dashboard';
import { Link } from 'react-router-dom';
import "../../css/StateStyle.css"


const StateReport = () => {

  // ================data call from store======================

  const { Loadstate } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Load_StateData());
  }, []);

  // console.log("State Data----", Loadstate)

  // ===================delete section=============

  const onDelete = (id) => {

    database.ref(`state_table/${id}`).remove((err) => {
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
            <td className='thead'>State name</td>
            <td className='thead'>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(Loadstate).map((id, index) => {
              return (
                <tr key={id} className="text-center">
                  <td scope="row" className='tdata'>{index + 1}</td>
                  <td className='tdata'>{Loadstate[id].stateid}</td>
                  <td className='tdata'>{Loadstate[id].state_name}</td>
                  <td className='tdata'>
                    <Link to={`/edit_StateReport/${id}`}>
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

export default StateReport;
