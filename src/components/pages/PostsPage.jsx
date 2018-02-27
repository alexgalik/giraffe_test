import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PostsList from "./PostsList";
export class Postspage extends Component {
  render() {
    const {posts, deletePost} = this.props;
    return (
      <Fragment>
        <header>
          <nav className="navbar navbar-expand navbar-dark fixed-top bg-dark">
            <div
              className="collapse navbar-collapse justify-content-around"
              id="navbarCollapse"
            >
              <div className="navbar-brand">
                Welcome to Dashboard {this.props.user}
              </div>
              <div className="mt-2 mt-md-0" onClick={this.props.logout}>
                <button className="btn btn-light my-2 my-sm-0">Log Out</button>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <div className="jumbotron text-center">
            <h1 className="display-4">Hello!</h1>
            <p className="lead">
              This is simple ad application. Press "Create ad" to add new one.
            </p>
            <hr className="my-4" />
            <Link
              to={{
                pathname: "/edit"
              }}
              className="btn btn-primary btn-lg"
              href="#"
              role="button"
            >
              Сreate ad
            </Link>
          </div>
          {posts.length > 0 ? <div className="container"><PostsList posts={posts} username={this.props.user} deletePost={deletePost}/></div>  : <div className="conteiner"><h1 className="col text-center">There are no posts yet :( </h1></div> }
        </main>
      </Fragment>
    );
  }
}

export default Postspage;
