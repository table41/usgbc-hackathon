import React, { Component } from 'react';
import classnames from 'classnames';
//import { Grid, Row } from 'react-bootstrap';
import Survey from '../Survey';

import './style.css';

export default class TakeSurvey extends Component {
  constructor(props) {
    super(props);
    if (!this.state) {
      this.state = {}
    }
  }

  componentDidMount() {
    var request = new Request(`https://3twwdo05lg.execute-api.us-west-2.amazonaws.com/prod/surveys/${this.props.params.surveyId}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          surveyData: json
        });
      });
  }

  handleClick = (e) => {
    this.props.router.push('/home');
  }

  render() {
    const className = this.props.className;
    console.log('Current State', this.state);
    return (
      <div className={classnames('TakeSurvey', className)}>
        <Survey data={ this.state.surveyData || {} } handleClick={this.handleClick}/>
      </div>
    );
  }
}
