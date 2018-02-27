import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePost } from "../../actions/postsActions";
import history from "../../history";
export class PostPage extends Component {
  deletePost = () => {
    this.props.deletePost(this.props.currentPost[0].id);
    history.push(`/`);
  };
  render() {
    const post = this.props.currentPost[0];
    const username = this.props.username;
    return (
      <div className="postpage">
        <div className="container" style={{ height: "100vh" }}>
          <div className="row align-items-center" style={{ height: "100vh" }}>
            <div className="card text-center">
              <div className="card-header text-left">
                <div className="row justify-content-between">
                  <h2>Made by {post.author_name}</h2>
                  <Link to="/" className="text-right">
                    <h2><i className="material-icons">home</i></h2>
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.description}</p>
                <div className="row justify-content-center">
                  {post.author_name === username && (
                    <div>
                      <Link to = {`/edit/${post.id}`} className="btn btn-outline-secondary">Edit</Link>
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
              <div className="card-footer text-muted text-right">
                Created at: {post.created_at}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentPost: state.posts.filter(post => post.id === props.match.params.id),
  username: state.user.username
});

PostPage.propTypes = {
  currentPost: PropTypes.array.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { deletePost })(PostPage);
