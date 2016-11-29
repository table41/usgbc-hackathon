import React, { Component } from 'react';
import classnames from 'classnames';
//import cookie from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.png';
import './style.css';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};


class App extends Component {
  constructor(props) {
    super(props);
    if (!this.state) {
      this.state = {}
      //var cookieState = cookie.load('fbObject');
    }
  }

  
  success = (pos) => {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    this.setState({
          location: crd
        });
  };

  responseFacebook = (response) => {
      console.log(response);
      this.setState({
        fbObject: response
      });

    };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, error, options);
  }

  render() {
    const className = this.props.className;
    const {children} = this.props;
    console.log(this.state);
  
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
