import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { sometLightTheme } from '../tools/themes.js';
import { dispType, dispSupport, dispDuration } from '../tools/helpers.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export function DashboardCards(props) {
  const today = new Date();
  const weekPlan = props.thisWeekPlan;
  let todayPlan = false;
  if (weekPlan) {
    todayPlan = weekPlan.days[today.getDay() - 1];
  }
  return (
    <MuiThemeProvider muiTheme={sometLightTheme}>
      <div className="row">
        <div className="col s6">
          <Card>
            <CardHeader
              title="Dernier entrainement"
              subtitle="27/03/1997"
            />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions expandable>
              <FlatButton label="Action2" />
            </CardActions>
          </Card>
        </div>
        <div className="col s6">
          <Card>
            <CardHeader
              title={todayPlan ? 'Programme du jour' : 'Pas de plan pour cette semaine'}
              subtitle={todayPlan ? dispType(todayPlan.type) : ''}
            />
            <CardText>
              <p>
                {todayPlan.support ? dispSupport(todayPlan.support) : ''}
              </p>
              <p>
                {todayPlan.duration ? dispDuration(todayPlan.duration) : ''}
              </p>
              <p>
                {todayPlan.description ? todayPlan.description : ''}
              </p>
            </CardText>
            <CardActions expandable>
              <FlatButton label="Action2" />
            </CardActions>
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
