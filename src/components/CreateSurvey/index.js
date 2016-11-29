import React, { Component } from 'react';
import classnames from 'classnames';
import { FormControl, FormGroup, ControlLabel, Button, Grid, Row } from 'react-bootstrap';

import './style.css';

export default class CreateSurvey extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const className = this.props.className;
    return (
      <div
        className={classnames('CreateSurvey', className)}>
        <Grid>
          <Row>
            <h1>Create Environmental Questionnaire</h1>
          </Row>
          <form>
            <Row>
              <FormGroup controlId="surveyNameInput">
                <ControlLabel>Name of the Environmental Questionnaire</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter the name of the Environmental Questionnaire"
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup controlId="questionPrompt">
                <ControlLabel>Question Prompt</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter the question prompt"
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup controlId="answerType">
                <ControlLabel>Answer Type</ControlLabel>
                <FormControl componentClass="select" placeholder="Select a Type">
                  <option value="select">Select a Type</option>
                  <option value="star-rating">Star Rating</option>
                  <option value="free-text">Free Text</option>
                </FormControl>
              </FormGroup>
            </Row>
            <Row>
              <Button type="submit" bsStyle="primary">
                Save
              </Button>
            </Row>
          </form>
        </Grid>
      </div>
    );
  }
}
