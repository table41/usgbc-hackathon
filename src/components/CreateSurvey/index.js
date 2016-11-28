import React, { Component } from 'react';
import classnames from 'classnames';
import { FormControl, FormGroup, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';

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
          <Grid>
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
            </Row>
            <Row>
              <Button type="submit" bsStyle="primary">
                Add a Question
              </Button>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}
