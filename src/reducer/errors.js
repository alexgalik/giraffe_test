const errors = ((state=[], action={}) => {
    switch(action.type) {
        case "PASSWORD_WRONG":
            return {...action.errors};
        default: return state;
    }
});

export default errors;