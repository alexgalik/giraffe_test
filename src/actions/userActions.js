export const userLoggedIn = user => ({
    type: 'USER_LOGGED_IN',
    user
});

export const userLoggedOut = () => ({
    type: 'USER_LOGGED_OUT'
});

export const initError = errors => ({
   type: "PASSWORD_WRONG",
   errors
});

export const login = data => dispatch => {
    let users = [];
    if (localStorage.getItem('users') === null) {
        users = [...users, data];
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(userLoggedIn(data));
    } else {
        users = JSON.parse(localStorage.getItem('users'));

        const user = users.find(user => user.username === data.username);
        if (user === undefined){
            users.push(data);
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(userLoggedIn(data));
        } else {
            if (user.password === data.password) {
                localStorage.setItem('user', JSON.stringify(data));
                dispatch(userLoggedIn(user));
            } else {
                dispatch(initError({global: 'password is wrong'}))
            }
        }

    }
    localStorage.setItem('users', JSON.stringify(users));
};

export const logOut = () => dispatch => {
    localStorage.removeItem('user');
    dispatch(userLoggedOut())
};

const authorize = data => dispatch => {
  dispatch(userLoggedIn(data));
};

export default authorize;