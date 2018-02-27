const user = ((state = [], action={}) => {
   switch(action.type) {
       case "USER_LOGGED_IN":
           return {...action.user};
       case "USER_LOGGEG_OUT":
           return {};
       default: return state;
   }
});

export default user;