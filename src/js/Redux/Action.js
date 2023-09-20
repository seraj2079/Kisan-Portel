import { type } from "@testing-library/user-event/dist/type";

export const Load_State_Table = 'Load_State_Table';
export const Load_City_Table = 'Load_City_Table';
export const Load_Area_Table = 'Load_Area_Table';
export const Load_Crop_Table = 'Load_Crop_Table';
export const Load_Product_Table = 'Load_Product_Table';
export const Load_Registration_Table = 'Load_Registration_Table';
export const Load_Registration_ImageTable = 'Load_Registration_ImageTable';
export const Load_Member_Table = 'Load_Member_Table';
export const Load_Member_ImageTable='Load_Member_ImageTable';
export const Load_Admin_Table='Load_Admin_Table';
export const Load_Admin_ImageTable='Load_Admin_ImageTable';

const loadData = 'https://kisan-portel-default-rtdb.firebaseio.com/';

// =========State Data========
export const Load_StateData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/state_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const state_data = await result.json();
            if (state_data) {
                dispatch({
                    type: Load_State_Table,
                    payload: state_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}

// ============City Data================

export const Load_cityData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/city_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const city_data = await result.json();
            if (city_data) {
                dispatch({
                    type: Load_City_Table,
                    payload: city_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}


// ==============Area Data ==============


export const Load_areaData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/area_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const area_data = await result.json();
            if (area_data) {
                dispatch({
                    type: Load_Area_Table,
                    payload: area_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}


// ========Crop data ===============

export const Load_cropData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/crop_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const crop_data = await result.json();
            if (crop_data) {
                dispatch({
                    type: Load_Crop_Table,
                    payload: crop_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}

// ===============Product Data ===============

export const Load_productData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/product_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const product_data = await result.json();
            if (product_data) {
                dispatch({
                    type: Load_Product_Table,
                    payload: product_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}

// ===============Registration Data============

export const Load_registrationData = (stnm, ctnm, arnm) => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/user_reg/${stnm}/${ctnm}/${arnm}.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const registration_data = await result.json();
            if (registration_data) {
                dispatch({
                    type: Load_Registration_Table,
                    payload: registration_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}
/////////////////////member registration detail/////////////////////////////////
export const Load_Member_Registration_Table='Load_Member_Registration_Table';
export const Load_Member_registrationData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/user_reg.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const member_registration_data = await result.json();
            if (member_registration_data) {
                dispatch({
                    type: Load_Member_Registration_Table,
                    payload: member_registration_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}

// =====================Registration Image Data ============================


export const Load_RegistrationImage = (stnm, ctnm, arnm,) => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/user_reg_img/${stnm}/${ctnm}/${arnm}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const registration_imagedata = await result.json();
            if (registration_imagedata) {
                dispatch({
                    type: Load_Registration_ImageTable,
                    payload: registration_imagedata
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }


        catch (error) {
            console.log(error);
        }
    }
}

// ================Member image Data===============



export const Load_memberImage = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/member_img_table.json`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const member_ImageData = await result.json();

            if (member_ImageData) {
                dispatch({
                    type: Load_Member_ImageTable,
                    payload: member_ImageData
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log(" block error");
        }
    }
}


// =========================member data================

export const Load_memberData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/member_table.json`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const member_data = await result.json();

            if (member_data) {
                dispatch({
                    type: Load_Member_Table,
                    payload: member_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log(" block error");
        }
    }
}

// =====================Admin Data=======================

export const Load_adminData = (stnm, ctnm, arnm) => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/admin_table/${stnm}/${ctnm}/${arnm}.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const admin_data = await result.json();
            if (admin_data) {
                dispatch({
                    type: Load_Admin_Table,
                    payload: admin_data
                })
            }
            else {
                console.log("App Category data not fetch");
            }
        }

        catch (error) {
            console.log("state block error");
        }
    }
}

// ======================Admin image data======================

export const Load_adminImage = (stnm, ctnm, arnm,) => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/admin_table_img/${stnm}/${ctnm}/${arnm}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const admin_imagedata = await result.json();
            if (admin_imagedata) {
                dispatch({
                    type: Load_Admin_ImageTable,
                    payload: admin_imagedata
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }


        catch (error) {
            console.log(error);
        }
    }
}

// ====================Login Member detail=====================

export const LOGIN_MEMBER_DETAIL='LOGIN_MEMBER_DETAIL';
export const loginMember=(loginDetail)=>{
    return async dispatch=>{
        dispatch({
        type:LOGIN_MEMBER_DETAIL,
        payload: loginDetail
    })
    }
}

// ====================owner Login detail=================

export const LOGIN_OWNER_DETAIL='LOGIN_OWNER_DETAIL';
export const loginOwner=(loginDetail)=>{
    return async dispatch=>{
        dispatch({
        type:LOGIN_OWNER_DETAIL,
        payload: loginDetail
    })
    }
}
