import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import database from '../../firebase';
import shortid from 'shortid';
import FileResizer from 'react-image-file-resizer';
import { useParams } from 'react-router-dom';
import OwnerDash from './OwnerDash';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_productData } from '../Redux/Action';
import ProductReport from '../Report/ProductReport';



const initData = {
    product_name: "",
    price: "",
    imgdata: "",
    productid: "",
    product_Detail: "",
    ownerName:""

}

let myfordata="";
const Product = () => {

    //   ========== send data in database ============
    const [state, setState] = useState(initData);
    const { id } = useParams();
    const [register,setRegister]=useState(false);
    let matchid = id;
    const [update, setUpdate] = useState(false);
    const { imgdata } = state;
    const { Loadproduct } = useSelector(state => state.cartreducer);
    const {LoadOwner_Detail}=useSelector(state=>state.cartreducer);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(Load_productData());
        Object.keys(Loadproduct).map((id, index) => {
            if (matchid === id) {
                setState({ ...Loadproduct[id] })
            }
        })
    }, [id]);


    const handlechange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }



    const handleSubmit = (e) => {

        const idData = shortid.generate();
        state.productid = idData;
        

        if (id) {
            loadupdateData()
        }
        else {
            dataInsert()
        }
        e.preventDefault();
    }

    const loadupdateData = () => {
        state.productid = productid;
        if (myfordata !== null) {

            updateData();

        }
        else{
            state.imgdata=imgdata;
            updateData();
        }
    }

    const updateData = () => {
        database.ref(`product_table/${id}`).set(state, (err) => {
            if (err) {
                alert("Product not update" +err);
            }
            else {
                alert("Product updated");
                setUpdate(true);
            }
        })
    }

        const dataInsert = () => {
            state.ownerName=LoadOwner_Detail.farmer_name;
        database.ref("product_table").push(state, (err) => {
            if (err) {
                alert("Product Register Unsuccessful");
            }
            else {
                alert("Product Register Successful");
                setRegister(true);
            }
        });
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
                        myfordata =uri        
                        state.imgdata = uri;
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


    const {product_name,productid,product_Detail,price} =state;
    return (
        <>
        {
            register?<><OwnerDash/></>:
            update ?<><ProductReport/></> :
        <>
           <OwnerDash/>
            <div className="container" style={{ marginTop: "150px" }}>
                <form onSubmit={handleSubmit} className="container border border-danger
            col-sm-offset-2 col-sm-3 mt-4"
                    style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>

                    <h3 className="text-center text-danger ">
                        Add Product Name
                    </h3>

                    <div className="container mb-4 text-danger">
                        <label className=' fw-bold'>Name</label>
                        <input
                            type="text"
                            name="product_name"
                            value={product_name || ""}
                            className="form-control"
                            placeholder="Enter Product name"
                            onChange={handlechange}
                        />
                    </div>
                    <div className="container mb-4 text-danger">
                        <label className=' fw-bold'>Price</label>
                        <input
                            type="text"
                            name="price"
                            value={price || ""}
                            className="form-control"
                            placeholder="Enter Product price"
                            onChange={handlechange}
                        />
                    </div>

                    <div className="container mb-4 text-danger">
                        <label className=' fw-bold'>photo</label>
                        <input
                            type="file"
                            name="imgdata"
                            className="form-control"
                            placeholder="Select image"
                            onChange={imageLoad}
                        />
                    </div>


                    <div className="container mb-4 text-danger">
                        <label className=' fw-bold'>Product Details</label>
                        <input
                            type="text"
                            name="product_Detail"
                            value={product_Detail || ""}
                            className="form-control"
                            placeholder="enter about product..."
                            onChange={handlechange}
                        />
                    </div>

                    <div className="container text-center mb-4">
                        <Button
                            type="submit"
                            className="btn btn-success text ">
                            {id ? "update" : "save"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
        }
        </>
    );
}

export default Product;