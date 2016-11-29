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
    fetch(`/prod/surveys/${this.props.params.surveyId}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          surveyData: json
        });
      });
  }

  render() {
    const className = this.props.className;
    console.log('Current State', this.state);
    return (
      <div className={classnames('TakeSurvey', className)}>
        <Survey data={ this.state.surveyData || {} } />
      </div>
    );
  }
}
