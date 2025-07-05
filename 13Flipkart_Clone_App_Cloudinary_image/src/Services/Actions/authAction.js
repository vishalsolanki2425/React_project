import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
            if (userCred.user)
                {
                    let user= {
                    email: userCred.user.email,
                    id: userCred.user.uid,
                    role: "user",
                    displayName: data.fullName || "User",
                    photoURL: userCred.user.photoURL || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                }
                // console.log("User Data :", user);
                await setDoc(doc(db, "users", `${user.id}`), user);
                dispatch(signUpSuc());
                }
        } catch (error) {
            console.error("Sign Up Error:", error);
            dispatch(errorMsg(error.message));
        }
    };
};

export const signINAsync = (data) => {
    return async (dispatch) => {
        try {
            let userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
            if (userCred.user) 
            {
                let docSnap = await getDoc(doc(db, "users", `${userCred.user.uid}`))
                    if (docSnap.exists()) {
                        let user = docSnap.data();
                        dispatch(signINSuc(user));
                    }
                // dispatch(signINSuc(userCred.user));
            }
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