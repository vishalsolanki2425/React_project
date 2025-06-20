import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";

export const getProductsSuc = (products) => ({
    type: "GET_PRODUCTS_SUCCESS",
    payload: products,
});

export const getProductsRej = (error) => ({
    type: "GET_PRODUCTS_REJECT",
    payload: error,
});

export const loading = () => ({
    type: "GET_PRODUCTS_REQUEST",
});

export const addproductSuc = () => ({
    type: "ADD_PRODUCTS",
    payload: "Product Added Successfully",
});

export const addproductRej = (error) => ({
    type: "ADD_PRODUCTS_REJECT",
    payload: error,
});

export const updateProductSuccess = (product) => ({
    type: "UPDATE_PRODUCT_SUCCESS",
    payload: product,
});

export const deleteProductSuccess = (id) => ({
    type: "DELETE_PRODUCT_SUCCESS",
    payload: id,
});

export const cartProductSuccess = (product) => ({
    type: "CART_PRODUCT_SUCCESS",
    payload: product,
});

export const getCartItemsSuccess = (cartItems) => ({
    type: "GET_CART_SUCCESS",
    payload: cartItems,
});

export const getCartItemsRej = (error) => ({
    type: "GET_CART_REJECT",
    payload: error,
});

export const removeCartItemSuccess = (id) => ({
    type: "REMOVE_CART_ITEM",
    payload: id,
});

export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const incrementQuantity = (productId) => ({
    type: INCREMENT_QUANTITY,
    payload: productId
});

export const decrementQuantity = (productId) => ({
    type: DECREMENT_QUANTITY,
    payload: productId
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const getProductsAsync = () => {
    return async (dispatch) => {
        dispatch(loading());

        let data = [];
        let res = await getDocs(collection(db, "products"));
        res.forEach(rec => {
            data.push(rec.data());
        })
        dispatch(getProductsSuc(data));

    };
};

export const addProductAsync = (product) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await setDoc(doc(db, "products", product.id), product);
            dispatch(addproductSuc());
        } catch (error) {
            dispatch(addproductRej(error.message));
        }
    };
};

export const updateProductAsync = (id, data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await updateDoc(doc(db, "products", id), data);
            dispatch(updateProductSuccess(res.data));
        } catch (err) {
            dispatch(getProductsRej(err.message));
        }
    };
};

export const deleteProductAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await deleteDoc(doc(db, "products", id));
            dispatch(deleteProductSuccess(id));
        } catch (err) {
            dispatch(getProductsRej(err.message));
        }
    };
};

export const getCartItemsAsync = () => {
    return async (dispatch) => {
        try {
            const items = [];
            const cartSnapshot = await getDocs(collection(db, "cart"));

            cartSnapshot.forEach((cartDoc) => {
                items.push({ id: cartDoc.id, ...cartDoc.data() });
            });
            dispatch(getCartItemsSuccess(items));
        } catch (error) {
            dispatch(getCartItemsRej(error.message));
        }
    };
};

export const addToCartAsync = (product) => {
    return async (dispatch) => {
        try {
            const cartRef = doc(db, "cart", product.id);
            const cartDoc = await getDoc(cartRef);

            if (cartDoc.exists()) {
                const currentItem = cartDoc.data();
                const updatedQty = (currentItem.quantity || 1) + 1;

                await updateDoc(cartRef, { quantity: updatedQty });
                dispatch(incrementQuantity(product.id));
            } else {
                await setDoc(cartRef, { ...product, quantity: 1 });
                dispatch(cartProductSuccess({ ...product, quantity: 1 }));
            }
            dispatch(getCartItemsAsync());
        } catch (error) {
            dispatch(cartError(error.message));
        }
    };
};

export const removeCartItemAsync = (id) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(db, "cart", id));
            dispatch(removeCartItemSuccess(id));
        } catch (err) {
            console.error("Error removing cart item:", err.message);
        }
    };
};