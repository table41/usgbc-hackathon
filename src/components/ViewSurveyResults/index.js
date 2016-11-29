import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class ViewSurveyResults extends Component {
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

  render() {
    const className = this.props.className;
    return (
      <div className={classnames('ViewSurveyResults', className)}>
        <h1>Results for {this.state.surveyData ? this.state.surveyData.name : this.props.params.surveyId}</h1>
        <p>Nobody has taken this Environmental Questionnaire yet.</p>
      </div>
    );
  }
}
