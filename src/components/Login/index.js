import React, { Component } from 'react';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';

function Goal(props) {
  return <h1><b>{props.name}</b></h1>
}
function Objective(props) {
  return <h2>{props.name}</h2>
}

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
        <Goal name="Together, we can" />
        <Objective name="Reduce energy, water, waste consumption" />
        <Objective name="Reduce pollution & CO2 Emissions" />
        <Objective name="Improve Air & Water Quality" />
        <Objective name="Improve Citizen Prosperity, equity, education, healthy, safety, and wellness" />
    </div>
  );
  }
}

export default Login;
