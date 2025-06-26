import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../Firebase";

const signUpSuc = () => ({
    type: "SIGN_UP_SUC"
});
export const signINSuc = (user) => ({
    type: "SIGN_IN_SUC",
    payload: user
});
const signOUTSUC = () => ({
    type: "SIGN_OUT_SUC"
});
const errorMsg = (err) => ({
    type: "ERROR",
    payload: err
});
export const resetAuthState = () => ({
    type: "RESET_AUTH_STATE"
});

export const signUpAsync = (data) => {
    return async (dispatch) => {
        try {
            let userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
            if (userCred.user) dispatch(signUpSuc());
        } catch (error) {
            dispatch(errorMsg(error.message));
        }
    };
};

export const signINAsync = (data) => {
    return async (dispatch) => {
        try {
            let userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
            if (userCred.user) dispatch(signINSuc(userCred.user));
        } catch (error) {
            dispatch(errorMsg(error.message));
        }
    };
};

export const googleSignInAsync = () => {
    return async (dispatch) => {
        try {
            let provider = new GoogleAuthProvider();
            let userCred = await signInWithPopup(auth, provider);
            if (userCred.user) dispatch(signINSuc(userCred.user));
        } catch (error) {
            dispatch(errorMsg(error.message));
        }
    };
};

export const signOutAsync = () => {
    return async (dispatch) => {
        try {
            await signOut(auth);
            dispatch(signOUTSUC());
        } catch (error) {
            dispatch(errorMsg(error.message));
        }
    };
};