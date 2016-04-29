import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Workouts from '../../api/workouts/methods';
import { dispDate } from '../tools/helpers.js';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SubHeader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {
  sometLightTheme,
  pageActionStyle,
  datePickerFieldStyle,
  datePickerStyle, hintTextFieldStyleDark } from '../tools/themes.js';

export class PageWorkoutEdit extends React.Component {
  constructor(props) {
    super(props);

    const workout = Session.get('workoutToEdit');

    if (workout) {
      this.state = {
        titleValue: workout.title ? workout.title : '',
        descriptionValue: workout.description ? workout.description : '',
        startDateValue: workout.startDate ? workout.startDate : new Date(),
        durationValue: workout.duration ? workout.duration : 0,
        distanceValue: workout.distance ? workout.distance : 0,
        supportValue: workout.support ? workout.support : '',
        crEffortValue: workout.cr ? workout.cr.effort + '' : 0,
        crPleasureValue: workout.cr ? workout.cr.pleasure + '' : 0,
        crSensationsValue: workout.cr ? workout.cr.sensations + '' : 0,
        crMoodValue: workout.cr ? workout.cr.mood + '' : 0,
        fitLinked: workout.fitLinked ? workout.fitLinked : false,
      };
    } else {
      this.state = {
        titleValue: '',
        descriptionValue: '',
        startDateValue: new Date(),
        durationValue: 0,
        distanceValue: 0,
        supportValue: '',
        crEffortValue: '0',
        crPleasureValue: '0',
        crSensationsValue: '0',
        crMoodValue: '0',
        fitLinked: false,
      };
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleSupportChange = this.handleSupportChange.bind(this);
    this.handleCrEffortValueChange = this.handleCrEffortValueChange.bind(this);
    this.handleCrPleasureValueChange = this.handleCrPleasureValueChange.bind(this);
    this.handleCrSensationsValueChange = this.handleCrSensationsValueChange.bind(this);
    this.handleCrMoodValueChange = this.handleCrMoodValueChange.bind(this);
    this.saveWorkout = this.saveWorkout.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ titleValue: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ descriptionValue: e.target.value });
  }

  handleStartDateChange(event, startDateValue) {
    this.setState({ startDateValue });
  }

  handleDurationChange(event, durationValue) {
    this.setState({ durationValue });
  }

  handleDistanceChange(event, distanceValue) {
    this.setState({ distanceValue });
  }

  handleSupportChange(event, supportValue) {
    this.setState({ supportValue });
  }

  handleCrEffortValueChange(event, index, crEffortValue) {
    this.setState({ crEffortValue });
    console.log(crEffortValue);
  }

  handleCrPleasureValueChange(event, index, crPleasureValue) {
    this.setState({ crPleasureValue });
  }

  handleCrSensationsValueChange(event, index, crSensationsValue) {
    this.setState({ crSensationsValue });
  }

  handleCrMoodValueChange(event, index, crMoodValue) {
    this.setState({ crMoodValue });
  }

  goBack() {
    const url = `/group/${this.props.params.group}/athlete/${this.props.params.athlete}/dashboard`;
    browserHistory.push(url);
    Session.set('workoutToEdit', false);
  }

  saveWorkout() {
    const workout = {
      owner: Meteor.userId(),
      title: this.state.titleValue,
      description: this.state.descriptionValue,
      startDate: this.state.startDateValue,
      duration: this.state.durationValue,
      distance: this.state.distanceValue,
      support: this.state.supportValue,
      fitLinked: this.state.fitLinked,
      cr: {
        effort: parseFloat(this.state.crEffortValue),
        pleasure: parseFloat(this.state.crPleasureValue),
        sensations: parseFloat(this.state.crSensationsValue),
        mood: parseFloat(this.state.crMoodValue),
      },
    };
    if (Session.get('workoutToEdit')) {
      Workouts.update.call({ _id: Session.get('workoutToEdit')._id, workout }, (e) => {
        if (!e) {
          Session.set('workoutToEdit', false);
          const url = `/group/${this.props.params.group}/athlete/` +
            `${this.props.params.athlete}/workout/view/${this.props.params.id}`;
          browserHistory.push(url);
        }
      });
    } else {
      Workouts.insert.call(workout, (e) => {
        if (!e) {
          const url = `/group/${this.props.params.group}/athlete/` +
            `${this.props.params.athlete}/dashboard`;
          browserHistory.push(url);
        }
      });
    }
  }

  render() {
    return (
      <div className="tab-content">
        <div>
          <FlatButton
            label="Retour"
            style={pageActionStyle}
            onClick={() => this.goBack()}
            icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
          />
          <FlatButton
            label="Enregistrer"
            onClick={() => this.saveWorkout()}
            style={pageActionStyle}
            icon={<FontIcon className="material-icons">save</FontIcon>}
          />
        </div>
        <div className="row">
          <div className="col s12">
            {Session.get('workoutToEdit') ?
              <span className="big-title white">
                {this.state.titleValue}
              </span>
            :
              <div>
                <TextField
                  hintText="Titre de l'entrainement"
                  className="big-title space_top"
                  style={datePickerFieldStyle}
                  hintStyle={hintTextFieldStyleDark}
                  value={this.state.titleValue}
                  onChange={this.handleTitleChange}
                  fullWidth
                />
              </div>
            }
            <br />
            <TextField
              hintText="Description rapide..."
              value={this.state.titleValue}
              onChange={this.handleTitleChange}
            />
          </div>
        </div>

        <MuiThemeProvider muiTheme={sometLightTheme}>
          <div className="row">
            <div className="col s12 m6 space_top">
              <Card
                style={{
                  height: '30rem',
                  overflow: 'auto',
                }}
              >
                <CardHeader title="Evaluation des sensations" />
                <CardText>
                  <SubHeader>Avant la sortie</SubHeader>
                  <SelectField
                    value={this.state.crSensationsValue}
                    floatingLabelText="Sensations"
                    onChange={this.handleCrSensationsValueChange}
                    fullWidth
                  >
                    <MenuItem value="0" primaryText="0" />
                    <MenuItem value="0.3" primaryText="0.3" />
                    <MenuItem value="0.5" primaryText="0.5" />
                    <MenuItem value="1" primaryText="1" />
                    <MenuItem value="1.5" primaryText="1.5" />
                    <MenuItem value="2" primaryText="2" />
                    <MenuItem value="2.5" primaryText="2.5" />
                    <MenuItem value="3" primaryText="3" />
                    <MenuItem value="4" primaryText="4" />
                    <MenuItem value="5" primaryText="5" />
                    <MenuItem value="6" primaryText="6" />
                    <MenuItem value="7" primaryText="7" />
                    <MenuItem value="8" primaryText="8" />
                    <MenuItem value="9" primaryText="9" />
                    <MenuItem value="10" primaryText="10" />
                    <MenuItem value="11" primaryText="11" />
                  </SelectField>
                  <SelectField
                    value={this.state.crMoodValue}
                    floatingLabelText="Humeur"
                    onChange={this.handleCrMoodValueChange}
                    fullWidth
                  >
                    <MenuItem value="0" primaryText="0" />
                    <MenuItem value="0.3" primaryText="0.3" />
                    <MenuItem value="0.5" primaryText="0.5" />
                    <MenuItem value="1" primaryText="1" />
                    <MenuItem value="1.5" primaryText="1.5" />
                    <MenuItem value="2" primaryText="2" />
                    <MenuItem value="2.5" primaryText="2.5" />
                    <MenuItem value="3" primaryText="3" />
                    <MenuItem value="4" primaryText="4" />
                    <MenuItem value="5" primaryText="5" />
                    <MenuItem value="6" primaryText="6" />
                    <MenuItem value="7" primaryText="7" />
                    <MenuItem value="8" primaryText="8" />
                    <MenuItem value="9" primaryText="9" />
                    <MenuItem value="10" primaryText="10" />
                    <MenuItem value="11" primaryText="11" />
                  </SelectField>
                  <SubHeader>Après la sortie</SubHeader>
                  <SelectField
                    value={this.state.crEffortValue}
                    floatingLabelText="Echelle d'effort"
                    onChange={this.handleCrEffortValueChange}
                    fullWidth
                  >
                    <MenuItem value="0" primaryText="0" />
                    <MenuItem value="0.3" primaryText="0.3" />
                    <MenuItem value="0.5" primaryText="0.5" />
                    <MenuItem value="1" primaryText="1" />
                    <MenuItem value="1.5" primaryText="1.5" />
                    <MenuItem value="2" primaryText="2" />
                    <MenuItem value="2.5" primaryText="2.5" />
                    <MenuItem value="3" primaryText="3" />
                    <MenuItem value="4" primaryText="4" />
                    <MenuItem value="5" primaryText="5" />
                    <MenuItem value="6" primaryText="6" />
                    <MenuItem value="7" primaryText="7" />
                    <MenuItem value="8" primaryText="8" />
                    <MenuItem value="9" primaryText="9" />
                    <MenuItem value="10" primaryText="10" />
                    <MenuItem value="11" primaryText="11" />
                  </SelectField>
                  <SelectField
                    value={this.state.crPleasureValue}
                    floatingLabelText="Echelle de plaisir"
                    onChange={this.handleCrPleasureValueChange}
                    fullWidth
                  >
                    <MenuItem value="0" primaryText="0" />
                    <MenuItem value="0.3" primaryText="0.3" />
                    <MenuItem value="0.5" primaryText="0.5" />
                    <MenuItem value="1" primaryText="1" />
                    <MenuItem value="1.5" primaryText="1.5" />
                    <MenuItem value="2" primaryText="2" />
                    <MenuItem value="2.5" primaryText="2.5" />
                    <MenuItem value="3" primaryText="3" />
                    <MenuItem value="4" primaryText="4" />
                    <MenuItem value="5" primaryText="5" />
                    <MenuItem value="6" primaryText="6" />
                    <MenuItem value="7" primaryText="7" />
                    <MenuItem value="8" primaryText="8" />
                    <MenuItem value="9" primaryText="9" />
                    <MenuItem value="10" primaryText="10" />
                    <MenuItem value="11" primaryText="11" />
                  </SelectField>
                  {/*
                  <SelectField
                    value={this.state.supportValue}
                    onChange={this.handleSupportChange}
                    floatingLabelText="Support"
                    disabled={this.state.disabled}
                    fullWidth
                  >
                    <MenuItem value="mtb" primaryText="VTT" />
                    <MenuItem value="road" primaryText="Route" />
                    <MenuItem value="ht" primaryText="Home Trainer" />
                    <MenuItem value="run" primaryText="Course à pied" />
                    <MenuItem value="skix" primaryText="Ski de fond" />
                    <MenuItem value="swim" primaryText="Natation" />
                    <MenuItem value="endr" primaryText="Enduro" />
                    <MenuItem value="othr" primaryText="Autre" />
                  </SelectField>

                  <SelectField
                    value={this.state.durationValue}
                    onChange={this.handleDurationChange}
                    floatingLabelText="Durée"
                    disabled={this.state.disabled}
                    fullWidth
                  >
                    <MenuItem value={900} primaryText="0h15" />
                    <MenuItem value={1800} primaryText="0h30" />
                    <MenuItem value={2700} primaryText="0h45" />
                    <MenuItem value={3600} primaryText="1h00" />
                    <MenuItem value={4500} primaryText="1h15" />
                    <MenuItem value={5400} primaryText="1h30" />
                    <MenuItem value={6300} primaryText="1h45" />
                    <MenuItem value={7200} primaryText="2h00" />
                    <MenuItem value={8100} primaryText="2h15" />
                    <MenuItem value={9000} primaryText="2h30" />
                    <MenuItem value={9900} primaryText="2h45" />
                    <MenuItem value={10800} primaryText="3h00" />
                    <MenuItem value={11700} primaryText="3h15" />
                    <MenuItem value={12600} primaryText="3h30" />
                    <MenuItem value={13500} primaryText="3h45" />
                    <MenuItem value={14400} primaryText="4h00" />
                    <MenuItem value={16200} primaryText="4h30" />
                    <MenuItem value={18000} primaryText="5h00" />
                    <MenuItem value={21600} primaryText="6h00" />
                  </SelectField>

                  <TextField
                    floatingLabelText="Description"
                    floatingLabelFixed
                    multiLine
                    fullWidth
                    disabled={this.state.disabled}
                    rows={2}
                    value={this.state.descriptionValue}
                    rowsMax={20}
                    onChange={(e) => this.handleDescriptionChange(e.target.value)}
                  />
          */}
                </CardText>
              </Card>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

PageWorkoutEdit.propTypes = {
  params: React.PropTypes.object,
};
