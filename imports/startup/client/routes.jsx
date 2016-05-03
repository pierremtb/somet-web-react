import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { sometDarkTheme } from '../../ui/tools/themes.js';
import { AppLayout } from '../../ui/layouts/layout-app.jsx';
import { PublicLayout } from '../../ui/layouts/layout-public.jsx';
import { TabDashboard } from '../../ui/components/tab-dashboard.jsx';
import { TabWorkouts } from '../../ui/components/tab-workouts.jsx';
import { TabPlans } from '../../ui/components/tab-plans.jsx';
import { TabCalendar } from '../../ui/components/tab-calendar.jsx';
import { TabAnalysis } from '../../ui/components/tab-analysis.jsx';
import { PagePlan } from '../../ui/pages/page-plan.jsx';
import { PageWorkout } from '../../ui/pages/page-workout.jsx';
import { PageFeed } from '../../ui/pages/page-feed.jsx';
import { PagePlanEdit } from '../../ui/pages/page-plan-edit.jsx';
import { PageWorkoutEdit } from '../../ui/pages/page-workout-edit.jsx';
import { PageGroupEdit } from '../../ui/pages/page-group-edit.jsx';
import { PageGroup } from '../../ui/pages/page-group.jsx';
import { PageProfile } from '../../ui/pages/page-profile.jsx';
import { PageLogin } from '../../ui/pages/page-login.jsx';
import { PageAthlete } from '../../ui/pages/page-athlete.jsx';
import { PageNotFound } from '../../ui/pages/page-not-found.jsx';
import { RecoverPassword } from '../../ui/pages/page-recover-password.jsx';
import { ResetPassword } from '../../ui/pages/page-reset-password.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    replace({
      pathname: '/action/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const redirectIfUser = (nextState, replace) => {
  if (Meteor.loggingIn() || Meteor.user()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <MuiThemeProvider muiTheme={sometDarkTheme}>
      <Router history={browserHistory}>
        <Route path="/action" component={PublicLayout}>
          <Route path="login" component={PageLogin} onEnter={redirectIfUser} />
          <Route path="recover-password" component={RecoverPassword} />
          <Route path="reset-password/:token" component={ResetPassword} />
        </Route>
        <Route path="/" component={AppLayout}>
          <IndexRoute name="home" component={PageFeed} onEnter={requireAuth} />
          <Route path="feed" component={PageFeed} onEnter={requireAuth} />
          <Route name="create-group" path="/group/new" component={PageGroupEdit} />
          <Route
            name="page-athlete"
            path="/group/:group/athlete/:athlete"
            component={PageAthlete}
            onEnter={requireAuth}
          >
            <Route path="dashboard" name="dashboard" component={TabDashboard} onEnter={requireAuth} />
            <Route path="workouts" name="workouts" component={TabWorkouts} onEnter={requireAuth} />
            <Route path="plans" name="plans" component={TabPlans} onEnter={requireAuth} />
            <Route path="calendar" name="calendar" component={TabCalendar} onEnter={requireAuth} />
            <Route path="analysis" name="analysis" component={TabAnalysis} onEnter={requireAuth} />
          </Route>
          <Route
            name="page-group"
            path="/group"
            onEnter={requireAuth}
          >
            <Route path=":group/view" component={PageGroup} onEnter={requireAuth} />
            <Route path=":group/edit" component={PageGroupEdit} onEnter={requireAuth} />
            <Route path="new" component={PageGroupEdit} onEnter={requireAuth} />
          </Route>
          <Route
            name="page-plan"
            path="/group/:group/athlete/:athlete/plan"
            onEnter={requireAuth}
          >
            <Route path="view/:id" component={PagePlan} onEnter={requireAuth} />
            <Route path="edit/:id" component={PagePlanEdit} onEnter={requireAuth} />
            <Route path="new" component={PagePlanEdit} onEnter={requireAuth} />
          </Route>
          <Route
            name="page-workout"
            path="/group/:group/athlete/:athlete/workout"
            onEnter={requireAuth}
          >
            <Route path="view/:id" component={PageWorkout} onEnter={requireAuth} />
            <Route path="edit/:id" component={PageWorkoutEdit} onEnter={requireAuth} />
            <Route path="new" component={PageWorkoutEdit} onEnter={requireAuth} />
          </Route>
          <Route
            name="page-profile"
            path="/profile"
            onEnter={requireAuth}
          >
            <Route path=":username" component={PageProfile} onEnter={requireAuth} />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Route>
      </Router>
    </MuiThemeProvider>,
    document.getElementById('react-root')
  );
});
