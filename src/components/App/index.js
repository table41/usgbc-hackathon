import React, { Component } from 'react';
import classnames from 'classnames';

import logo from './logo.svg';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      </div>
    );
  }
}

export default App;
