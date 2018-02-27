const postCreated = data => ({
  type: "POST_CREATED",
  data
});

const postsFetched = data => ({
    type: "POSTS_FETCHED",
    data
  });

const postDeleted = id => ({
  type: "POST_DELETE",
  id
})

const postUpdated = data => ({
  type: "POST_UPDATED",
  data
})

export const createPost = data => dispatch => {
  let posts = [];
  if (localStorage.getItem("posts") === null) {
    posts = [...posts, data];
    dispatch(postCreated(data));
  } else {
    posts = JSON.parse(localStorage.getItem('posts'));
    posts.push(data);
    dispatch(postCreated(data));
  }
  localStorage.setItem('posts', JSON.stringify(posts));
};

export const fetchPosts = () => dispatch => {
    let posts = [];
    if (localStorage.getItem("posts") !== null) {
        posts = JSON.parse(localStorage.getItem('posts'));
    }
    dispatch(postsFetched(posts));
}

export const deletePost = (id) => dispatch => {
   let posts = JSON.parse(localStorage.getItem('posts'));
   posts = posts.filter(post => post.id !== id);
   dispatch(postDeleted(id));
   localStorage.setItem('posts', JSON.stringify(posts));
}

export const updatePost = data => dispatch =>{
  let posts = JSON.parse(localStorage.getItem('posts'));
  posts = posts.map(post => {
    if (post.id === data.id){
      post.title = data.title;
      post.description = data.description;
      post.created_at = data.created_at;
    }
    return post;
  })
  dispatch(postUpdated(data));
  localStorage.setItem('posts', JSON.stringify(posts));
}

const initialPosts = data => dispatch => {
  dispatch(postsFetched(data));
}

export default initialPosts;