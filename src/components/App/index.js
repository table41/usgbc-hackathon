import React, { Component } from 'react';
import classnames from 'classnames';
//import cookie from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.png';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    if (!this.state) {
      this.state = {}
      //var cookieState = cookie.load('fbObject');
    }

  }

  render() {
    const className = this.props.className;
    const {children} = this.props;
    console.log(this.state);
    this.responseFacebook = (response) => {
      console.log(response);
      this.setState({
        fbObject: response
      });

    };

    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>LEED City</h2>
        </div>
        <img src={this.state.fbObject ? this.state.fbObject.picture.data.url : ''} alt="facebook" />
        {children}
        <div className={this.state.fbObject ? 'hidden' : ''}>
        <FacebookLogin
          appId="211863512589812"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook} />
        </div>
      </div>
    );
  }
}

export default App;
