import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import CreateSurvey from './components/CreateSurvey';
import TakeSurvey from './components/TakeSurvey';
import ViewSurveyResults from './components/ViewSurveyResults';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/survey/create" component={CreateSurvey} />
    <Route path="/survey/:surveyId/" component={TakeSurvey} />
    <Route path="/survey/:surveyId/results" component={ViewSurveyResults} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
