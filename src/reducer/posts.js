const posts = (state = [], action = {}) => {
  switch (action.type) {
    case "POSTS_FETCHED":
      return [...action.data];
    case "POST_CREATED":
      return [...state, action.data];
    case "POST_DELETE":
      return state.filter(post => post.id !== action.id);
    case "POST_UPDATED":
      return state.map(post => {
        if (post.id === action.data.id) return (post = action.data);
        return post;
      });
    default:
      return state;
  }
};

export default posts;
