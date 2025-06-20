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

        case "ADD_PRODUCTS": // Assuming this is your 'add to cart' action
            {
                const existingItemIndex = state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (existingItemIndex > -1) {
                    // If item already exists, increment its quantity
                    const updatedCartItems = state.cartItems.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: (item.quantity || 1) + 1 } // Ensure quantity property exists, then increment
                            : item
                    );
                    return {
                        ...state,
                        loading: false, // Assuming ADD_PRODUCTS also signals completion
                        cartItems: updatedCartItems,
                    };
                } else {
                    // If item is new, add it with quantity 1
                    return {
                        ...state,
                        loading: false, // Assuming ADD_PRODUCTS also signals completion
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

        case "CART_PRODUCT_SUCCESS": // This might be redundant if "ADD_PRODUCTS" handles adding to cart
            // This case might be used if you're fetching cart items after adding one
            // However, if "ADD_PRODUCTS" handles quantity, this case simply adds without checking existing.
            // Consider consolidating cart addition logic into one place (e.g., "ADD_PRODUCTS").
            // For now, I'll assume it's for initial cart population or distinct 'add' behavior.
            return {
                ...state,
                // Ensure quantity is set if not present when fetched, or handled by "ADD_PRODUCTS"
                cartItems: [...state.cartItems, { ...action.payload, quantity: action.payload.quantity || 1 }]
            };


        case "GET_CART_SUCCESS":
            return {
                ...state,
                cartItems: action.payload.map(item => ({ ...item, quantity: item.quantity || 1 })) // Ensure quantity property is set to 1 if not present
            };

        case "REMOVE_CART_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };

        // --- New cases for quantity management ---
        case "INCREMENT_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: (item.quantity || 1) + 1 } // Increment quantity, default to 1 if missing
                        : item
                ),
            };

        case "DECREMENT_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems
                    .map(item =>
                        item.id === action.payload
                            ? { ...item, quantity: (item.quantity || 1) - 1 } // Decrement quantity, default to 1 if missing
                            : item
                    )
                    .filter(item => (item.quantity || 0) > 0), // Remove item if quantity becomes 0 or less
            };

        case "CLEAR_CART": // New case to clear all cart items
            return {
                ...state,
                cartItems: [],
            };

        default:
            return state;
    }
};

export default Product_Reducer;