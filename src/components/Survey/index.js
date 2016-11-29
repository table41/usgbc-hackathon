import React from 'react';
import { FormControl, FormGroup, ControlLabel, Radio, Button, Grid, Row } from 'react-bootstrap';

const AnswerCtrl = ({type, answers}) => {
  if(type === 'free-text') {
    return (
      <FormControl
        type="text"
      />
    );
  } else if (type === 'multiple-choice') {
    return (
      <div>
        {answers.map((answer, index) => {
          return (
            <Radio key={index}>{answer}</Radio>
          );
        })}
      </div>
    );
  } else if (type === 'star-rating') {
    return (
      <div>
        <Radio inline>1</Radio>
        <Radio inline>2</Radio>
        <Radio inline>3</Radio>
        <Radio inline>4</Radio>
        <Radio inline>5</Radio>
      </div>
    );
  } else if (type === 'drop-down') {
    return (
      <FormControl componentClass="select" placeholder="Choose One">
        <option value="select">Choose One</option>
        {answers.map((answer, index) => {
          return (
            <option key={index}>{answer}</option>
          );
        })}
      </FormControl>
    );
  } else {
    return (
      <div>Answer type not supported.</div>
    );
  }
}

const Question = ({prompt, type, answers, index}) => {
  return (
    <FormGroup controlId={`question${index}`}>
      <ControlLabel>{ prompt }</ControlLabel>
      <AnswerCtrl type={type} answers={answers} />
    </FormGroup>
  );
};

const Survey = ({data}) => {
  const questions = data.questions || [];
  return (
    <Grid>
      <Row>
        <h1>{ data.name }</h1>
      </Row>
      { questions.map((question, index) => {
        return (
          <Row key={index}>
            <Question prompt={question.prompt} type={question.questionType} answers={question.selectableAnswers} index={index} />
          </Row>
        );
      }) }
      <Row>
        <Button type="submit" bsStyle="primary">
          Save
        </Button>
      </Row>
    </Grid>
  );
};

export default Survey;
