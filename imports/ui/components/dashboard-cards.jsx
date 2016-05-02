import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { sometLightTheme, planCardTextStyle } from '../tools/themes.js';
import { dispType, dispSupport, dispDuration, dispDate } from '../tools/helpers.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export function DashboardCards(props) {
  const today = new Date();
  const weekPlan = props.thisWeekPlan;
  const lastWorkout = props.lastWorkout;
  let todayPlan = false;
  if (weekPlan) {
    todayPlan = weekPlan.days[today.getDay() - 1];
  }
  return (
    <MuiThemeProvider muiTheme={sometLightTheme}>
      <div className="row">
        <div className="col s6">
          <Card initiallyExpanded>
            <CardHeader
              title={lastWorkout ? 'Dernier entrainement' : 'Pas encore d\'entrainement'}
              subtitle={lastWorkout ? dispDate(lastWorkout.startDate) : 'Ajoutez-en un !'}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable style={planCardTextStyle}>
              {lastWorkout ?
                <div>
                  <p>{dispSupport(lastWorkout.support)}</p>
                  <p>{dispDuration(lastWorkout.duration)}</p>
                  <p>{lastWorkout.description}</p>
                </div>
              : null}
            </CardText>
          </Card>
        </div>
        <div className="col s6">
          <Card initiallyExpanded>
            <CardHeader
              title={todayPlan ? 'Programme du jour' : 'Pas de plan pour cette semaine'}
              subtitle={todayPlan ? dispType(todayPlan.type) : 'Contactez votre entraineur !'}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable style={planCardTextStyle}>
              {todayPlan ?
                <div>
                  <p>
                    {todayPlan.support ? dispSupport(todayPlan.support) : ''}
                  </p>
                  <p>
                    {todayPlan.duration ? dispDuration(todayPlan.duration) : ''}
                  </p>
                  <p>
                    {todayPlan.description ? todayPlan.description : ''}
                  </p>
                </div>
              : null}
            </CardText>
          </Card>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

DashboardCards.propTypes = {
  thisWeekPlan: React.PropTypes.object,
  lastWorkout: React.PropTypes.object,
};
