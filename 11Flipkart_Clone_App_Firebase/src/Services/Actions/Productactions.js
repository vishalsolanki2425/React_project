import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

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
        try {
            let data = [];
            let res = await getDocs(collection(db, "products"))
            res.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            })
            dispatch(getProductsSuc(res.data));
        } catch (error) {
            dispatch(getProductsRej(error.message));
        }
    };
};

export const addProductAsync = (product) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await addDoc(collection(db, "products"), product); 
            dispatch(addproductSuc());
            dispatch(getProductsAsync());
        } catch (error) {
            dispatch(addproductRej(error.message));
        }
    };
};

export const updateProductAsync = (id, data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            const res = await axios.put(`http://localhost:3000/products/${id}`, data);
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
            await axios.delete(`http://localhost:3000/products/${id}`);
            dispatch(deleteProductSuccess(id));
        } catch (err) {
            dispatch(getProductsRej(err.message));
        }
    };
};

export const getCartItemsAsync = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get("http://localhost:3000/cart");
            dispatch(getCartItemsSuccess(res.data));
        } catch (error) {
            dispatch(getCartItemsRej(error.message));
        }
    };
};

export const addToCartAsync = (item) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3000/cart?id=${item.id}`);
            if (res.data.length === 0) {
                await axios.post("http://localhost:3000/cart", item);
                dispatch(getCartItemsAsync());
            } else {
                alert("Product already in cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};

export const removeCartItemAsync = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3000/cart/${id}`);
            dispatch(removeCartItemSuccess(id));
        } catch (err) {
            console.error("Error removing cart item:", err.message);
        }
    };
};
