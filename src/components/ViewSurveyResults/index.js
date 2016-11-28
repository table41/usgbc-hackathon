import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class ViewSurveyResults extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('ViewSurveyResults', className)} {...props}>
        <h1>Results for {this.props.params.surveyId}</h1>
      </div>
    );
  }
}
