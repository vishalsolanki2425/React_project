const initialState = {
    user: null,
    admin: null,
    isCreated: false,
    errorMSG: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_UP_SUC":
            return {
                ...state,
                isCreated: true,
                errorMSG: ""
            };
        case "SIGN_IN_SUC":
            return {
                ...state,
                user: action.payload,
                admin: action.payload.role === "admin" ? action.payload : null,
                isCreated: false,
                errorMSG: ""
            };
        case "SIGN_OUT_SUC":
            return {
                ...state,
                user: null,
                admin: null,
                errorMSG: "plases login again"
            };
        case "ERROR":
            return {
                ...state,
                errorMSG: action.payload
            };
        case "RESET_AUTH_STATE":
            return {
                ...state,
                errorMSG: "",
                isCreated: false
            };
        default:
            return state;
    }
};

export default authReducer;