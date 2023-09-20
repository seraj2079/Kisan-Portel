import React from 'react'
import { Route, Routes } from 'react-router-dom'; 
import SignIn from "../Login/SignIn";
import MemberLogin from "../Login/MemberLogin"
import MemberDash from './MemberDash';
import Registration from './Registration';
import RegistrationReport from '../Report/RegistrationReport';
import Dashboard from "./Dashboard";
import StateRegis from '../Location/StateRegis';
import CityRegis from '../Location/CityRegis';
import AreaRegis from '../Location/AreaRegis';
import StateReport from '../Report/StateReport';
import CityReport from '../Report/CityReport';
import AreaReport from '../Report/AreaReport';
import CropReport from '../Report/CropReport';
import Crop from './Crop';
import MemberRegis from './MemberRegis';
import Product from './Product';
import ProductReport from '../Report/ProductReport';
import MemberReport from '../Report/MemberReport';
import AdminDash from './AdminDash';
import Profile from '../Login/Profile';




const MyMap = () => {
  return (
  <>
    <Routes>
    <Route path="/" element={<SignIn/>}/>
    <Route path="/member_login" element={<MemberLogin/>}/>
    <Route path='/member_dash' element={<MemberDash/>}/>
    <Route path='/register' element={<Registration/>}/>
    <Route path ="/RegistrationReport" element={<RegistrationReport/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/add_crop' element={<Crop/>}/>
    <Route path='/member_registration' element={<MemberRegis/>}/>
    <Route path='/add_item' element={<Product/>}/>
    <Route path='/manage_item' element={<ProductReport/>}/>

    {/* ======================Location================ */}
    <Route path='/stateregis' element={<StateRegis/>}/>
    <Route path='/cityregis' element={<CityRegis/>}/>
    <Route path='/arearegis' element={<AreaRegis/>}/>

    {/* ============Report================================= */}
    <Route path='/state_report' element={<StateReport/>}/>
    <Route path='/city_report' element={<CityReport/>}/>
    <Route path='/area_report' element={<AreaReport/>}/>
    <Route path='/crop_report' element={<CropReport/>}/>
    <Route path='/member_report' element={<MemberReport/>}/>
    <Route path='/regis_report' element={<AdminDash/>}/>

    {/* ============Edit======================================== */}
    <Route path='/edit_StateReport/:id' element={<StateRegis/>}/>
    <Route path='/edit_CityReport/:id' element={<CityRegis/>}/>
    <Route path='/edit_AreaReport/:id' element={<AreaRegis/>}/>
    <Route path='/edit_CropReport/:id' element={<Crop/>}/>
    <Route path='/edit_MemberReport/:id' element={<MemberRegis/>}/>
    <Route path='/edit_ProductReport/:id' element={<Product/>}/>
    <Route path='/edit_OwnerReport/:id' element={<Registration/>}/>
    </Routes>
  </>
  )
}

export default MyMap;