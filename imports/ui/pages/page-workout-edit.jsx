import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Workouts from '../../api/workouts/methods';
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
  datePickerStyle, hintTextFieldStyleDark, normalTextFieldStyleDark } from '../tools/themes.js';

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

    this.durationItems = [];
    for (let i = 1; i < 120; i++) {
      this.durationItems.push(
        <MenuItem
          value={300 * i}
          primaryText={`${Math.floor(300 * i / 3600)}h${300 * i % 3600 / 60}`}
        />
      );
    }

    this.distanceItems = [];
    for (let i = 1; i < 300; i++) {
      this.distanceItems.push(
        <MenuItem
          value={i}
          primaryText={`${i} km`}
        />
      );
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

  handleDurationChange(event, index, durationValue) {
    this.setState({ durationValue });
  }

  handleDistanceChange(event, distanceValue) {
    this.setState({ distanceValue });
  }

  handleSupportChange(event, index, supportValue) {
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
      console.log(workout);
      Workouts.insert.call(workout, (e) => {
        if (!e) {
          const url = `/group/${this.props.params.group}/athlete/` +
            `${this.props.params.athlete}/dashboard`;
          browserHistory.push(url);
        } else {
          console.log(e);
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

            <MuiThemeProvider muiTheme={sometLightTheme}>
              <DatePicker
                hintText="Date"
                container="inline"
                value={this.state.startDateValue}
                onChange={this.handleStartDateChange}
                textFieldStyle={normalTextFieldStyleDark}
                style={datePickerStyle}
                autoOk
              />
            </MuiThemeProvider>
          </div>
        </div>

        <MuiThemeProvider muiTheme={sometLightTheme}>
          <div className="row">
            <div className="col s12 m6 space_bottom">
              <Card>
                <CardHeader
                  title="Détails"
                  subtitle="Informations sur la sortie"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  <SelectField
                    value={this.state.supportValue}
                    onChange={this.handleSupportChange}
                    floatingLabelText="Support"
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
                    floatingLabelText="Durée de la séance"
                    fullWidth
                  >
                    {this.durationItems}
                  </SelectField>

                  <SelectField
                    value={this.state.distanceValue}
                    onChange={this.handleDistanceChange}
                    floatingLabelText="Distance parcourue"
                    fullWidth
                  >
                    {this.distanceItems}
                  </SelectField>
                </CardText>
              </Card>
            </div>
            <div className="col s12 m6 space_bottom">
              <Card>
                <CardHeader
                  title="Evaluation des sensations"
                  subtitle="Echelles CR10 pour l'entraineur"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
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
                </CardText>
              </Card>
            </div>
            <div className="col s12 m6 space_bottom">
              <Card>
                <CardHeader
                  title="Contenu"
                  subtitle="Description de la séance"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  <TextField
                    hintText="Description de la séance..."
                    multiLine
                    rows={2}
                    rowsMax={99}
                  />
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
