import React, { Component } from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

function Goal(props) {
  return <h1><b>{props.name}</b></h1>
}
function Objective(props) {
  return <h2>{props.name}</h2>
}

class Login extends Component {


  render() {
    const className = this.props.className;
    return (
      <div className={classnames('Login', className)}>

        <Link to={`/home`}>View Current Environmental Questionnaires in your area.</Link>
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
