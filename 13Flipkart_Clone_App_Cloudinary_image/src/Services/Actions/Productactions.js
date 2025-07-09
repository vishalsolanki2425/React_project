import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, where } from "firebase/firestore";
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

export const addToCartAsync = (product) => {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().authReducer;
            if (!user || !user.id || !product?.id) {
                console.error("Invalid user or product:", { user, product });
                return;
            }

            const cartDocId = `${user.id}_${product.id}`;
            const cartRef = doc(db, "cart", cartDocId);
            const cartDoc = await getDoc(cartRef);

            if (cartDoc.exists()) {
                await updateDoc(cartRef, { quantity: increment(1) });
                dispatch(incrementQuantity(product.id));
            } else {
                await setDoc(cartRef, {
                    ...product,
                    quantity: 1,
                    uid: user.id,
                });
                dispatch(cartProductSuccess({
                    ...product,
                    quantity: 1,
                    id: cartDocId
                }));
            }

            dispatch(getCartItemsAsync());
        } catch (error) {
            console.error("Add to cart error:", error.message);
        }
    };
};

export const getCartItemsAsync = () => {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().authReducer;
            if (!user || !user.id) return;

            const items = [];
            const cartRef = collection(db, "cart");
            const snapshot = await getDocs(cartRef);

            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.uid === user.id) {
                    items.push({ id: docSnap.id, ...data });
                }
            });

            dispatch(getCartItemsSuccess(items));
        } catch (error) {
            dispatch(getCartItemsRej(error.message));
        }
    };
};

export const removeCartItemAsync = (id) => {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().authReducer;
            if (!user || !user.id) return;

            const cartId = `${user.id}_${id}`;
            await deleteDoc(doc(db, "cart", cartId));
            dispatch(removeCartItemSuccess(cartId));
            dispatch(getCartItemsAsync());
        } catch (err) {
            console.error("Error removing cart item:", err.message);
        }
    };
};

export const placeOrderAsync = () => {
    return async (dispatch, getState) => {
        try {
            const { cartItems } = getState().Product_Reducer;
            const { user } = getState().authReducer;
            if (!user || !user.id || cartItems.length === 0) return;

            const order = {
                userId: user.id,
                items: cartItems,
                total: cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
                status: "Processing",
                createdAt: new Date().toISOString()
            };

            const orderRef = await addDoc(collection(db, "orders"), order);
            dispatch({ type: "ADD_ORDER_SUCCESS", payload: { id: orderRef.id, ...order } });

            for (const item of cartItems) {
                const cartId = `${user.id}_${item.id}`;
                await deleteDoc(doc(db, "cart", cartId));
            }
            dispatch({ type: "CLEAR_CART" });
        } catch (error) {
            console.error("Error placing order:", error.message);
        }
    };
};

export const getOrdersAsync = () => {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().authReducer;
            if (!user || !user.id) return;

            const orders = [];
            const snapshot = await getDocs(collection(db, "orders"));

            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.userId === user.id) {
                    orders.push({ id: docSnap.id, ...data });
                }
            });

            dispatch({ type: "GET_ORDERS_SUCCESS", payload: orders });
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    };
};
