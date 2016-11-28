import React, { Component } from 'react';
import classnames from 'classnames';
import { FormControl, FormGroup, ControlLabel, Button, Grid, Row } from 'react-bootstrap';

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
        <Grid>
          <Row>
            <h1>Create Survey</h1>
          </Row>
          <form>
            <Row>
              <FormGroup controlId="surveyNameInput">
                <ControlLabel>Name of the Survey</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter the name of the Survey"
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
                  <option>Star Rating</option>
                  <option>Free Text</option>
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
