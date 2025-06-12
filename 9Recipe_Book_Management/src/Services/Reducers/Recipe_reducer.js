const initialState = {
    recipes: JSON.parse(localStorage.getItem("recipe")) || [],
    recipe: null,
    isLoading: false
};

const recipe_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RECIPES': {
            const newRecipes = [...state.recipes, action.payload];
            localStorage.setItem("recipe", JSON.stringify(newRecipes));
            return {
                ...state,
                recipes: newRecipes
            };
        }

        case "GET_ALL_RECIPE": {
            const allRecipes = JSON.parse(localStorage.getItem("recipe")) || [];
            return {
                ...state,
                recipes: allRecipes,
                isLoading: false
            };
        }

        case "GET_RECIPE": {
            const storedRecipes = JSON.parse(localStorage.getItem("recipe")) || [];
            const singleRecipe = storedRecipes.find(recipe => recipe.id === Number(action.payload));
            return {
                ...state,
                recipe: singleRecipe || null
            };
        }

        case "DELETE_RECIPE": {
            const currentRecipes = JSON.parse(localStorage.getItem("recipe")) || [];
            const updatedAfterDelete = currentRecipes.filter(recipe => recipe.id !== action.payload);
            localStorage.setItem("recipe", JSON.stringify(updatedAfterDelete));
            return {
                ...state,
                recipes: updatedAfterDelete
            };
        }

        case "UPDATE_RECIPE": {
            const getrecipes = JSON.parse(localStorage.getItem("recipe"));
            const updatedrecipes = getrecipes.map(recipe =>
                recipe.id === action.payload.id ? action.payload : recipe
            );
            localStorage.setItem("recipe", JSON.stringify(updatedrecipes));
            return {
                ...state,
                recipes: updatedrecipes,
                recipe: null
            };
        }

        default:
            return state;
    }
};

export default recipe_reducer;