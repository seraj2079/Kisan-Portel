import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_productData } from '../Redux/Action';
import { Button } from 'react-bootstrap';
import database from '../../firebase';
import { Link } from 'react-router-dom';
import OwnerDash from '../Component/OwnerDash';
import "../../css/ProductStyle.css";


const ProductReport = () => {

    // ================data call from store======================

    const { Loadproduct } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Load_productData());
    }, []);

    // ===================delete section=============

    const onDelete = (id) => {

        database.ref(`product_table/${id}`).remove((err) => {
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
        <OwnerDash/>
        <div className="container border border-danger mt-5"
            style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
            <table id="table" className="container text-light mb-4">
                <thead>
                    <tr className='text-center'>
                        <td className='thead'>Sno</td>
                        <td className='thead'>Product Id</td>
                        <td className='thead'>Name</td>
                        <td className='thead'>Price</td>
                        <td className='thead'>Detail</td>
                        <td className='thead'>Image</td>
                        <td className='thead'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(Loadproduct).map((id, index) => {
                            return (
                                <tr key={id} className="text-center" >
                                    <td scope='row' className='product'>{index + 1}</td>
                                    <td className='product'>{Loadproduct[id].productid}</td>
                                    <td className='product'>{Loadproduct[id].product_name}</td>
                                    <td className='product'>{Loadproduct[id].price}</td>
                                    <td className='product'>{Loadproduct[id].product_Detail}</td>
                                    <td className='product'>
                                        <img src={Loadproduct[id].imgdata} width="50" height="50" />
                                    </td>
                                    <td className='product'>
                                        <Link to={`/edit_ProductReport/${id}`}>
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

export default ProductReport;
