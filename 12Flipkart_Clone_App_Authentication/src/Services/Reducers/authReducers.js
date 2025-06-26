const initialState = {
    user: null,
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
                isCreated: false,
                errorMSG: ""
            };
        case "SIGN_OUT_SUC":
            return {
                ...state,
                user: null,
                errorMSG: ""
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