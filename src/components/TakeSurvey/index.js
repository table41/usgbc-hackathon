import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row } from 'react-bootstrap';

import './style.css';

export default class TakeSurvey extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  componentDidMount() {
    fetch(`https://3twwdo05lg.execute-api.us-west-2.amazonaws.com/prod/surveys/${this.props.params.surveyId}`)
      .then(json => {
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
            <p>{this.state.surveyData.name}</p>
          </Row>
        </Grid>
      </div>
    );
  }
}
