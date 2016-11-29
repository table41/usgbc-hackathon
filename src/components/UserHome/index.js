import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row } from 'react-bootstrap';

class UserHome extends Component {
  constructor(props) {
    super(props);
    if (!this.state) {
      this.state = {}
    }
  }

  onCurPosSuccess = (pos) => {
    var crd = pos.coords;

    this.setState({
      location: crd
    });

    var request = new Request(`https://3twwdo05lg.execute-api.us-west-2.amazonaws.com/prod/surveys/?lat=${crd.latitude}&lon=${crd.longitude}`, {
    //var request = new Request(`https://3twwdo05lg.execute-api.us-west-2.amazonaws.com/prod/surveys/`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          surveys: json
        });
      });
  };

  onCurPosError = (err) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(this.onCurPosSuccess, this.onCurPosError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }

  render () {
    const className = this.props.className;
    const surveys = this.state.surveys || [];
    console.log('Current State', this.state);
    return (
      <div className={classnames('UserHome', className)}>
        <Grid>
          <Row>
            <h1>Current Surveys</h1>
              <ul className="list-group">
                {surveys.map((survey, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={`/survey/${survey.survey_id}/`}>{survey.name}</a>
                  </li>
                ))}
              </ul>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserHome;
