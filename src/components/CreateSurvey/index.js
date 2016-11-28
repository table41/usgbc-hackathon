import React, { Component } from 'react';
import classnames from 'classnames';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import './style.css';

export default class CreateSurvey extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={classnames('CreateSurvey', className)} {...props}>
        <h1>Create Survey</h1>
        <form>
          <FormGroup controlId="surveyNameInput">
            <ControlLabel>Name of the Survey</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter the name of the Survey"
            />
          </FormGroup>
          <div class="row">
            <FormGroup controlId="questionType">
              <ControlLabel>
                Question Type
              </ControlLabel>
              <FormControl componentClass="select">
                <option>Multiple Selection</option>
                <option>Drop Down</option>
                <option>Star Rating</option>
                <option>Free Text</option>
              </FormControl>
            </FormGroup>
          </div>
          <button type="submit" class="btn btn-primary">
            Add a Question
          </button>
        </form>
      </div>
    );
  }
}
