export const add_recipe = (data) => {
    return {
        type: 'ADD_RECIPES',
        payload: data
    };
};

export const all_recipe = () => {
    return {
        type: 'GET_ALL_RECIPE',
    };
};

export const delete_recipe = (id) => {
    return {
        type: "DELETE_RECIPE",
        payload: id
    };
};

export const update_recipe = (data) => {
    return {
        type: "UPDATE_RECIPE",
        payload: data
    }
};

export const get_recipe = (id) => {
    return {
        type: "GET_RECIPE",
        payload: id
    };
};