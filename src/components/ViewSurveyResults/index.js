import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class ViewSurveyResults extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const className = this.props.className;
    return (
      <div className={classnames('ViewSurveyResults', className)}>
        <h1>Results for {this.props.params.surveyId}</h1>
      </div>
    );
  }
}
