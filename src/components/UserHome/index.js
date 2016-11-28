import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row } from 'react-bootstrap';

class UserHome extends Component {
  render () {
    const className = this.props.className;
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
