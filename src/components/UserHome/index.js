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
    console.log('Current State', this.state);
    return (
      <div className={classnames('UserHome', className)}>
        <Grid>
          <Row>
            <h1>User Home</h1>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserHome;
