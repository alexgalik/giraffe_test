import React, { Component } from "react";
import FormAuth from "../forms/FormAuth";
import PostsPage from "../pages/PostsPage";
import PropTypes from "prop-types";
import { login, logOut } from "../../actions/userActions";
import { deletePost } from "../../actions/postsActions";
import { connect } from "react-redux";

class MainPage extends Component {
  state = {
    user: this.props.user.username ? this.props.user.username : "",
    errors: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.username) {
      this.setState({
        user: nextProps.user.username
      });
    }
    this.setState({
      errors: nextProps.errors
    });
  }

  submit = data => this.props.login(data);
  logout = () => {
    this.setState({
      user: ""
    });
    this.props.logOut();
  };

  render() {
    const FormAuthWrapper = (
      <div className="text-center login">
        <div className="container" style={{ height: "100vh" }}>
          <div className="row align-items-center" style={{ height: "100vh" }}>
            <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
              <div className="card">
                <h2 className="card-header">Welcome!</h2>
                <div className="card-body">
                  <FormAuth submit={this.submit} errors={this.state.errors} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return this.state.user === "" ? (
      FormAuthWrapper
    ) : (
      <PostsPage user={this.state.user} logout={this.logout} posts={this.props.posts} deletePost={this.props.deletePost}/>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,
  login: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}


const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { login, logOut, deletePost})(
  MainPage
);
