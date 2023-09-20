const INIT_DATA = {
    Loadstate: [],
    Loadcity: [],
    Loadarea: [],
    Loadcrop: [],
    Loadproduct: [],
    Loaduserreg: [],
    Loadmember: [],
    Loaduserreg_img: [],
    Loadmember_img: [],
    Loadadmin_reg: [],
    Loadadmin_img: [],
    LoadMember_Detail: [],
    LoadMember_RegistrationDetail: [],
    LoadOwner_Detail:[]
};
export const cartreducer = (state = INIT_DATA, action) => {
    switch (action.type) {
        case "Load_State_Table":
            return { ...state, Loadstate: action.payload };
        case "Load_City_Table":
            return { ...state, Loadcity: action.payload };
        case "Load_Area_Table":
            return { ...state, Loadarea: action.payload };
        case "Load_Crop_Table":
            return { ...state, Loadcrop: action.payload };
        case "Load_Product_Table":
            return { ...state, Loadproduct: action.payload };
        case "Load_Registration_Table":
            return { ...state, Loaduserreg: action.payload };
        case "Load_Registration_ImageTable":
            return { ...state, Loaduserreg_img: action.payload };
        case "Load_Member_Table":
            return { ...state, Loadmember: action.payload };
        case "Load_Member_ImageTable":
            return { ...state, Loadmember_img: action.payload };
        case "Load_Admin_Table":
            return { ...state, Loadadmin_reg: action.payload };
        case "Load_Admin_ImageTable":
            return { ...state, Loadadmin_img: action.payload };
        case "LOGIN_MEMBER_DETAIL":
            return { ...state, LoadMember_Detail: action.payload };
        case "Load_Member_Registration_Table":
            return { ...state, LoadMember_RegistrationDetail: action.payload };
            case "LOGIN_OWNER_DETAIL":
                return { ...state, LoadOwner_Detail: action.payload };    
        default:
            return state
    }
}