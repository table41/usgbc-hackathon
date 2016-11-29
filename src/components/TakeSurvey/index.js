import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row } from 'react-bootstrap';

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
    return (
      <div className={classnames('TakeSurvey', className)}>
        <Grid>
          <Row>
            <h1>Take Survey: {this.props.params.surveyId}</h1>
            <p>{this.state.surveyData ? this.state.surveyData.name : '' }</p>
          </Row>
        </Grid>
      </div>
    );
  }
}
