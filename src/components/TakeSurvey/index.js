import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row } from 'react-bootstrap';

import './style.css';

export default class TakeSurvey extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const className = this.props.className;
    return (
      <div className={classnames('TakeSurvey', className)}>
        <Grid>
          <Row>
            <h1>Take Survey: {this.props.params.surveyId}</h1>
          </Row>
        </Grid>
      </div>
    );
  }
}
