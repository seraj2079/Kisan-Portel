import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import { Load_memberData, Load_memberImage } from "../Redux/Action";
import {Button} from 'react-bootstrap';
import database from '../../firebase';
import { NavLink } from "react-router-dom";
import "../../css/MemberStyle.css"
import Dashboard from "../Component/Dashboard";


const MemberReport =() => {

  //================data call from store====================
 
 const {Loadmember} = useSelector(state=>state.cartreducer);
 const { Loadmember_img} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch(Load_memberData());
        dispatch(Load_memberImage());
    },
  [dispatch] );

  // console.log("member Data----------",Loadmember);
  // console.log("member imgdata-----------", Loadmember_img);


  /////////////////delete section/////////////////////////////

  const onDelete = (id,number,id1) => {
    database.ref(`member_table/${id}`).remove((err)=>{
      if(err){
        alert("data not deleted");
      }
      else{
        database.ref(`member_img_table/${id1}`).remove();
        alert("data deleted");
      }
    }
    )
   }
  

  const imageLoad =(number)=>(
      Object.keys(Loadmember_img[number]).map((id1,index) =>{
           
                global.imgdata=Loadmember_img[number][id1].imgdata; 
                return(
                    <img src={global.imgdata} height="40" width="40"/>
                )       
      }) 
  )


    return(
      <>
        <Dashboard/>
        <div className="container border border-danger mb-2"
        style={{backgroundColor:"#0B0B45",borderRadius:'12px',fontSize:"14px"}}>
          <table className="container text-light mt-4">
            <thead>
              <tr className="text-center">
                <td className="thead">S No.</td>
                <td className="thead">Member Id</td>
                <td className="thead">Name</td>
                <td className="thead">Father Name</td>
                <td className="thead">Number</td>
                <td className="thead">Address</td>
                <td className="thead">Image</td>
                <td className="thead">Action</td>
                
              </tr>
            </thead>
            <tbody>
              
                 {((Loadmember.length != 0 && Loadmember_img.length != 0)) ? <>{
                Object.keys(Loadmember).map ((id,index1)=>(
                  Object.keys(Loadmember[id]).map((id1,index)=>{

                  return(
                    <tr key={id} className="text-center" scope="row" >
                      <td className="tdata-member">{index1 +1}</td>
                      <td className="tdata-member">{Loadmember[id][id1].memberid}  </td>
                      <td className="tdata-member">{Loadmember[id][id1].member_name}  </td>
                      <td className="tdata-member">{Loadmember[id][id1].father_name}  </td>
                      <td className="tdata-member">{Loadmember[id][id1].member_number}  </td>
                      <td className="tdata-member">{Loadmember[id][id1].member_address}  </td>
                       <td className="tdata-member">
                      {imageLoad(Loadmember[id][id1].member_number)}
                     </td> 
                      <td className="tdata-member">
                      <NavLink to={`/edit_MemberReport/${id1}`}>
                     <Button className='m-2 btn btn-warning text text-light'>
                          Edit
                       </Button>
                         </NavLink>    
                      <Button className="m-2 btn btn-danger text text-light"
                       onClick={()=>onDelete(id)}>
                      Delete
                      </Button>
                     </td>
                    </tr>
                  );
                }
                )
                
                )
                )
              }</> :
              <>Pls Load</>
              }
           

            </tbody>

          </table>

        </div>
        </>
    );
}
export default MemberReport;