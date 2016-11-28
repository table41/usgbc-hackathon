import React, { Component } from 'react';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      fbObject: response
    });
  };

  render() {
    const className = this.props.className;
    return (
      <div className={classnames('Login', className)}>
        <FacebookLogin
          appId="211863512589812"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook}
        />
    </div>
  );
  }
}

export default Login;
