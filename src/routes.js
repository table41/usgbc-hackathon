import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Login from './components/Login'
import NotFound from './components/NotFound';
import CreateSurvey from './components/CreateSurvey';
import TakeSurvey from './components/TakeSurvey';
import ViewSurveyResults from './components/ViewSurveyResults';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} >
      <IndexRoute component={Login} />
      <Route path="/survey/create" component={CreateSurvey} />
      <Route path="/survey/:surveyId/" component={TakeSurvey} />
      <Route path="/survey/:surveyId/results" component={ViewSurveyResults} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
