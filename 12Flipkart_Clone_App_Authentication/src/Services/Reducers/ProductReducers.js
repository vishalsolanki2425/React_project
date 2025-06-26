const initialState = {
    products: [],
    cartItems: [],
    loading: false,
    error: null,
};

const Product_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_REQUEST":
            return {
                ...state,
                loading: true
            };

        case "GET_PRODUCTS_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload
            };

        case "GET_PRODUCTS_REJECT":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case "ADD_PRODUCTS": 
            {
                const existingItemIndex = state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (existingItemIndex > -1) {
                    const updatedCartItems = state.cartItems.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: (item.quantity || 1) + 1 } 
                            : item
                    );
                    return {
                        ...state,
                        loading: false,
                        cartItems: updatedCartItems,
                    };
                } else {
                    return {
                        ...state,
                        loading: false, 
                        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                    };
                }
            }

        case "UPDATE_PRODUCT_SUCCESS":
            return {
                ...state,
                loading: false,
                products: state.products.map((prod) => prod.id === action.payload.id ? action.payload : prod),
            };

        case "DELETE_PRODUCT_SUCCESS":
            return {
                ...state,
                loading: false,
                products: state.products.filter((prod) => prod.id !== action.payload),
            };

        case "CART_PRODUCT_SUCCESS": 
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: action.payload.quantity || 1 }]
            };


        case "GET_CART_SUCCESS":
            return {
                ...state,
                cartItems: action.payload.map(item => ({ ...item, quantity: item.quantity || 1 })) 
            };

        case "REMOVE_CART_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };

        case "INCREMENT_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                ),
            };

        case "DECREMENT_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems
                    .map(item =>
                        item.id === action.payload
                            ? { ...item, quantity: (item.quantity || 1) - 1 }
                            : item
                    )
                    .filter(item => (item.quantity || 0) > 0),
            };

        case "CLEAR_CART": 
            return {
                ...state,
                cartItems: [],
            };

        default:
            return state;
    }
};

export default Product_Reducer;