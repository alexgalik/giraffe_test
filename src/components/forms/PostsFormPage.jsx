import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { createPost, updatePost } from "../../actions/postsActions";
import uuidv4 from "uuid/v4";
import history from "../../history";

class PostsFormPage extends Component {
  state = {
    post: {
      id: this.props.currentPost ? this.props.currentPost[0].id : null,
      title: this.props.currentPost ? this.props.currentPost[0].title : "",
      description: this.props.currentPost
        ? this.props.currentPost[0].description
        : "",
      author_name: this.props.currentPost
        ? this.props.currentPost[0].author_name
        : ""
    },
    errors: {},
    editing: this.props.currentPost ? true : false
  };

  onChange = e => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.post);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const author_name = this.props.username;
      const created_at = new Date().toDateString();
      const id = uuidv4().split("-")[0];
      const { post, editing } = this.state;

      if (!editing) {
        const newPost = {
          id: id,
          title: post.title,
          description: post.description,
          author_name: author_name,
          created_at: created_at
        };
        this.props.createPost(newPost);
        history.push(`/posts/${id}`);
      } else {
        const newPost = {
          id: post.id,
          title: post.title,
          description: post.description,
          author_name: author_name,
          created_at: created_at
        };
        this.props.updatePost(newPost);
        history.push(`/posts/${post.id}`);
      }
    }
  };

  validate = post => {
    let errors = {};
    if (!post.description) errors.description = "can't be empty";
    if (!post.title) errors.title = "can't be empty";
    return errors;
  };
  render() {
    const { post, errors, editing } = this.state;
    const form = (
      <div className="postsform">
        <div className="container" style={{ height: "100vh" }}>
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <form className="col-7" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="FormControlInput">Title:</label>
                <input
                  type="text"
                  autoComplete="off"
                  className={
                    errors.title ? "form-control is-invalid" : "form-control"
                  }
                  id="FormControlInput"
                  name="title"
                  value={post.title}
                  onChange={this.onChange}
                />
                <div className="invalid-feedback">{errors.title}</div>
              </div>
              <div className="form-group">
                <label htmlFor="FormControlTextarea">Description:</label>
                <textarea
                  className={
                    errors.description
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="FormControlTextarea"
                  rows="5"
                  name="description"
                  value={post.description}
                  onChange={this.onChange}
                />
                <div className="invalid-feedback">{errors.description}</div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">
                {editing ? "Save" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {this.props.username === post.author_name || post.author_name === "" ? (
          form
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  if (match.params.id) {
    return {
      username: state.user.username,
      errors: state.errors,
      currentPost: state.posts.filter(post => post.id === match.params.id)
    };
  } else {
    return {
      username: state.user.username,
      errors: state.errors
    };
  }
};

PostsFormPage.propTypes = {
  username: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  currentPost: PropTypes.array
};

export default connect(mapStateToProps, { createPost, updatePost })(PostsFormPage);
