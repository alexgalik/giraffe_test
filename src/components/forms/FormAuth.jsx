import React, { Component } from "react";

class FormAuth extends Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.user);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.user);
    }
  };
  validate = user => {
    let errors = {};
    if (!user.username) errors.username = "can't be empty";
    if (!user.password) errors.password = "can't be empty pass";
    return errors;
  };
  onChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    const { user, errors } = this.state;
    return (
      <div className="text-left">
        <form onSubmit={this.onSubmit}>
          {errors.global && (
            <div className="alert alert-danger">{errors.global}</div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={user.username}
              onChange={this.onChange}
              className={
                errors.username ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={this.onChange}
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default FormAuth;
