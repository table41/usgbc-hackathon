import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class TakeSurvey extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('TakeSurvey', className)} {...props}>
        <h1>Take Survey: {this.props.params.surveyId}</h1>
      </div>
    );
  }
}
