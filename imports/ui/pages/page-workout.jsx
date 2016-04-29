import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Workouts } from '../../api/workouts/workouts';
import { dispDate, dispDuration, dispDayName, dispSupport, dispType } from '../tools/helpers.js';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import reactMixin from 'react-mixin';
import { Loading } from '../components/loading.jsx';
import { lightWhite, white, yellow200 } from 'material-ui/styles/colors';
import { sometLightTheme, pageActionStyle } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import moment from 'moment';

export class PageWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
    this.editWorkout = this.editWorkout.bind(this);
  }

  getMeteorData() {
    const data = {};
    const id = this.props.params.id;
    const handle = Meteor.subscribe('this-workout', id);
    if (handle.ready()) {
      data.workout = Workouts.findOne({ _id: id });
    }
    return data;
  }

  getTitle(date, key) {
    return `${dispDayName(key)} ${moment(date).add(key, 'days').format('DD/MM')}`;
  }

  editWorkout() {
    Session.set('workoutToEdit', this.data.workout);
    const url = `/group/${this.props.params.group}/athlete/` +
      `${this.props.params.athlete}/workout/edit/${this.props.params.id}`;
    browserHistory.push(url);
  }

  goBack() {
    const url = `/group/${this.props.params.group}/athlete/${this.props.params.athlete}/dashboard`;
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="tab-content">
        <div>
          <FlatButton
            label="Retour"
            style={pageActionStyle}
            onClick={this.goBack}
            icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
          />
          <FlatButton
            label="Modifier"
            onClick={this.editWorkout}
            style={pageActionStyle}
            icon={<FontIcon className="material-icons">edit</FontIcon>}
          />
        </div>
        {this.data.workout ?
          <div className="row">
            <div className="col s12">
              <span className="big-title white">
                Semaine du {dispDate(this.data.workout.mondayDate)}
              </span>
              <br />
              <p
                className="under-big-title"
                style={{ color: lightWhite }}
              >
                {this.data.workout.title} <br />
                Durée totale : {dispDuration(this.data.workout.duration)}
              </p>
            </div>
            <MuiThemeProvider muiTheme={sometLightTheme}>
              <div className="space_top row">
                <Card><CardHeader>Hello</CardHeader></Card>
              </div>
            </MuiThemeProvider>
          </div>
        : <Loading />}
      </div>
    );
  }
}

reactMixin(PageWorkout.prototype, ReactMeteorData);

PageWorkout.propTypes = {
  params: React.PropTypes.object,
};

