import React, { Component } from 'react';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';

import logo from './logo.svg';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      fbObject: response
    });
  };

  render() {
    const className = this.props.className;
    console.log(this.state);
    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>LEED City</h2>
        </div>
        <img src={this.state.fbObject ? this.state.fbObject.picture.data.url : ''} alt="facebook" />
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

export default App;
