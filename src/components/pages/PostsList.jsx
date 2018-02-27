import React, { Component, Fragment } from "react";
import Pagination from "../utils/Pagination";
import { Link } from "react-router-dom";
import history from "../../history";
 class PostsList extends Component {
  state = {
    pageOfItems: []
  };
  deletePost = id => {
    this.props.deletePost(id);
  };
  editPost = id => {
    history.push(`/edit/${id}`);
    // console.log(this)
  }
  onChangePage = pageOfItems => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  };
  render() {
    const { posts, username } = this.props;
    let postsCards = this.state.pageOfItems.map(post => {
      return (
        <div className="col-9 card-group" key={post.id}>
          <div className="card bg-light">
            <div className="card-header">
              <Link to={`/posts/${post.id}`} className="card-title">
                <h2>{post.title}</h2>
              </Link>
            </div>
            <div className="card-body">
              <p className="card-text">{post.description}</p>
              <div className="row">
                {post.author_name === username && (
                  <div>
                    <div
                      className="btn btn-outline-secondary"
                      onClick={() => this.editPost(post.id)}
                    >
                      Edit
                    </div>
                    <div
                      className="btn btn-outline-secondary"
                      onClick={() => this.deletePost(post.id)}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <Fragment>
        <div className="row justify-content-center">{postsCards}</div>
        <br />
        <div className="row justify-content-center">
          <Pagination items={posts} onChangePage={this.onChangePage} />
        </div>
      </Fragment>
    );
  }
}

export default PostsList