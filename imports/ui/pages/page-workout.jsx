import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Workouts } from '../../api/workouts/workouts';
import { Groups } from '../../api/groups/groups';
import { dispDate, dispDuration,
  dispSupport, dispDistance } from '../tools/helpers.js';
import SubHeader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import reactMixin from 'react-mixin';
import { Loading } from '../components/loading.jsx';
import { lightWhite } from 'material-ui/styles/colors';
import { sometLightTheme, pageActionStyle, workoutCardTextStyle } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export class PageWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
    this.editWorkout = this.editWorkout.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getMeteorData() {
    const data = {};
    const id = this.props.params.id;
    const workoutSubscription = Meteor.subscribe('this-workout', id);
    const myGroupsSubscription = Meteor.subscribe('my-groups');
    if (workoutSubscription.ready() && myGroupsSubscription.ready()) {
      data.workout = Workouts.findOne({ _id: id });
      this.canEdit = data.workout.owner === Meteor.userId();
      let canView = false;
      if (!this.canEdit) {
        Groups.find().fetch().map((group) => {
          const trainers = group.trainers;
          const athletes = group.athletes;
          const me = Meteor.userId();
          const owner = data.workout.owner;
          const isInAthletes = athletes.indexOf(owner) !== 1;
          if (trainers.indexOf(me) !== -1 && isInAthletes) {
            canView = true;
          } else if (group.seeOtherAthletesWorkouts && isInAthletes) {
            canView = true;
          }
          return group;
        });
      }
      this.canView = this.canEdit || canView;

      if (!this.canView) {
        this.goBack();
      }
    }
    return data;
  }

  editWorkout() {
    Session.set('workoutToEdit', this.data.workout);
    const url = `/group/${this.props.params.group}/athlete/` +
      `${this.props.params.athlete}/workout/edit/${this.props.params.id}`;
    browserHistory.push(url);
  }

  goBack() {
    const { group, athlete } = this.props.params;
    browserHistory.push(`/group/${group}/athlete/${athlete}/workouts`);
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
          {this.canEdit ?
            <FlatButton
              label="Modifier"
              onClick={this.editWorkout}
              style={pageActionStyle}
              icon={<FontIcon className="material-icons">edit</FontIcon>}
            />
          : null}
        </div>
        {this.data.workout ?
          <div className="row">
            <div className="col s12">
              <span className="big-title white">
                {this.data.workout.title}
              </span>
              <br />
              <p
                className="under-big-title"
                style={{ color: lightWhite }}
              >
                {dispDate(this.data.workout.startDate)}
              </p>
            </div>
            <MuiThemeProvider muiTheme={sometLightTheme}>
              <div>
                <div className="space_top col s12 m6">
                  <Card initiallyExpanded>
                    <CardHeader
                      title="Details"
                      subtitle="Informations chiffrées sur la sortie"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText expandable style={workoutCardTextStyle}>
                      <p>Support : {dispSupport(this.data.workout.support)}</p>
                      <p>Durée : {dispDuration(this.data.workout.duration)}</p>
                      <p>Distance : {dispDistance(this.data.workout.distance)}</p>
                    </CardText>
                  </Card>
                </div>
                <div className="space_top col s12 m6">
                  <Card initiallyExpanded>
                    <CardHeader
                      title="Evaluation des sensations"
                      subtitle="Echelles CR10 pour l'entraineur"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText expandable style={workoutCardTextStyle}>
                      <SubHeader>Avant la sortie</SubHeader>
                      <p>Humeur : {this.data.workout.cr.mood}</p>
                      <p>Sensations : {this.data.workout.cr.sensations}</p>
                      <SubHeader>Après la sortie</SubHeader>
                      <p>CR10 Effort : {this.data.workout.cr.effort}</p>
                      <p>CR10 Plaisir : {this.data.workout.cr.pleasure}</p>
                    </CardText>
                  </Card>
                </div>
                <div className="space_top col s12 m6">
                  <Card initiallyExpanded>
                    <CardHeader
                      title="Contenu"
                      subtitle="Description de la séance"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText expandable style={workoutCardTextStyle}>
                      <p>{this.data.workout.description}</p>
                    </CardText>
                  </Card>
                </div>
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

