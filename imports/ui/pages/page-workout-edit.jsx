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
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { HTTP } from 'meteor/http';
import { WorkoutChart } from '../components/workout-chart.jsx';
import { getFitSupport, dispDuration, dispDistance,
  dispElevation, dispCalories, dispPower } from '../tools/helpers';
import Slider from 'material-ui/Slider';
import { pink400, orange400, red400, blue400, green400, brown400 } from 'material-ui/styles/colors';
import {
  sometLightTheme,
  pageActionStyle,
  datePickerFieldStyle, workoutCardTextStyle,
  datePickerStyle, hintTextFieldStyleDark, normalTextFieldStyleDark } from '../tools/themes.js';

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

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
        crEffortValue: workout.cr ? `${workout.cr.effort}` : 0,
        crPleasureValue: workout.cr ? `${workout.cr.pleasure}` : 0,
        crSensationsValue: workout.cr ? `${workout.cr.sensations}` : 0,
        crMoodValue: workout.cr ? `${workout.cr.mood}` : 0,
        fitLinked: workout.fitLinked ? workout.fitLinked : false,
        fitObject: workout.fitObject ? workout.fitObject : {},
        parsingFit: false,
        xAxisType: 'distance',
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
        parsingFit: false,
        xAxisType: 'distance',
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
    this.parseFit = this.parseFit.bind(this);
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
    const { group, athlete } = this.props.params;
    let url = `/group/${group}/athlete/${athlete}/`;
    if (Session.get('workoutToEdit')) {
      url += `workout/view/${Session.get('workoutToEdit')._id}`;
    } else {
      url += 'workouts';
    }
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
      //fitObject: this.state.fitObject,
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
        } else {
          console.log(e);
        }
      });
    } else {
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

  parseFit(event) {
    const reader = new FileReader();
    const self = this;
    self.setState({ parsingFit: true });
    reader.onload = (file) => {
      Meteor.call('parseThisFitBufferString', file.srcElement.result, (err, fitObject) => {
        if (err) {
          alert('Problème lors de la lecture du fichier.');
          self.setState({ parsingFit: false });
          return;
        }

        if (fitObject.file_id.type !== 'activity') {
          alert('Ce n\'est pas un fichier d\'activité');
          self.setState({ parsingFit: false });
          return;
        }

        const { sport,
          total_timer_time, total_distance,
          start_position_long, start_position_lat } = fitObject.activity.sessions[0];

        self.setState({
          startDateValue: fitObject.activity.timestamp,
          supportValue: getFitSupport(sport),
          durationValue: parseInt(total_timer_time, 10),
          distanceValue: parseInt(total_distance, 10),
          fitLinked: true,
          fitObject,
          parsingFit: false,
        });

        console.log(self.state);

        HTTP.call(
          'get',
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${start_position_lat},${start_position_long}`,
          (error, geocodeObj) => {
            self.setState({
              titleValue: `${sport} in ${geocodeObj.data.results[0].address_components[2].short_name}`,
            });
          }
        );
      });
    };
    reader.readAsBinaryString(event.target.files[0]);
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
          <FlatButton
            label="Importer un fichier .FIT"
            style={pageActionStyle}
            labelPosition="before"
            icon={<FontIcon className="material-icons">file_upload</FontIcon>}
          >
            <input
              type="file"
              onChange={this.parseFit} style={styles.exampleImageInput}
              accept=".fit"
            />
          </FlatButton>
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
              <Card initiallyExpanded>
                <CardHeader
                  title="Détails"
                  subtitle="Informations sur la sortie"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable style={workoutCardTextStyle}>
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
                  <SubHeader>
                    <span>{'Durée totale : '}</span>
                    <span>{dispDuration(this.state.durationValue)}</span>
                  </SubHeader>
                  <Slider
                    min={0}
                    max={36000}
                    step={300}
                    defaultValue={7200}
                    value={this.state.durationValue}
                    onChange={this.handleDurationChange}
                  />
                  <SubHeader>
                    <span>{'Distance totale : '}</span>
                    <span>{dispDistance(this.state.distanceValue)}</span>
                  </SubHeader>
                  <Slider
                    min={0}
                    max={300000}
                    step={1000}
                    defaultValue={35000}
                    value={this.state.distanceValue}
                    onChange={this.handleDistanceChange}
                  />
                </CardText>
              </Card>
            </div>
            <div className="col s12 m6 space_bottom">
              <Card initiallyExpanded={false}>
                <CardHeader
                  title="Evaluation des sensations"
                  subtitle="Echelles CR10 pour l'entraineur"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable style={workoutCardTextStyle}>
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
              <Card initiallyExpanded={false}>
                <CardHeader
                  title="Contenu"
                  subtitle="Description de la séance"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable style={workoutCardTextStyle}>
                  <TextField
                    hintText="Description de la séance..."
                    value={this.state.descriptionValue}
                    onChange={this.handleDescriptionChange}
                    multiLine
                    fullWidth
                    rows={2}
                    rowsMax={99}
                  />
                </CardText>
              </Card>
            </div>
            {this.state.fitLinked ?
              <div className="col s12 space_bottom">
                <Card initiallyExpanded>
                  <CardHeader
                    title="Analyse"
                    subtitle="Données .FIT"
                    actAsExpander
                    showExpandableButton
                  />
                  <CardText expandable style={{ height: 'auto' }}>
                    <SubHeader>Détails</SubHeader>
                    <p>Ascension totale :
                      <span>
                        {dispElevation(this.state.fitObject.activity.sessions[0].total_ascent)}
                      </span>
                    </p>
                    <p>Descente totale :
                      <span>
                        {dispElevation(this.state.fitObject.activity.sessions[0].total_descent)}
                      </span>
                    </p>
                    <p>Calories consommées :
                      <span>
                        {dispCalories(this.state.fitObject.activity.sessions[0].total_calories)}
                      </span>
                    </p>
                    <WorkoutChart
                      xAxisType={this.state.xAxisType}
                      color={green400}
                      data={this.state.fitObject}
                      reduceFactor={5}
                      title="Altitude"
                      yAxisField="altitude"
                    />
                    <WorkoutChart
                      xAxisType={this.state.xAxisType}
                      color={blue400}
                      data={this.state.fitObject}
                      reduceFactor={5}
                      title="Vitesse"
                      yAxisField="speed"
                    />
                    <WorkoutChart
                      xAxisType={this.state.xAxisType}
                      color={orange400}
                      data={this.state.fitObject}
                      reduceFactor={5}
                      title="Puissance"
                      yAxisField="power"
                      details={
                        <div className="row">
                          <div className="col s4">
                            <p>
                              Puissance maximale :
                              {dispPower(this.state.fitObject.activity.sessions[0].max_power)}
                            </p>
                            <p>
                              Puissance moyenne :
                              {dispPower(this.state.fitObject.activity.sessions[0].avg_power)}
                            </p>
                          </div>
                        </div>
                      }
                    />
                    <WorkoutChart
                      xAxisType={this.state.xAxisType}
                      color={red400}
                      data={this.state.fitObject}
                      reduceFactor={5}
                      title="Fréquence cardiaque"
                      yAxisField="heart_rate"
                    />
                    <WorkoutChart
                      xAxisType={this.state.xAxisType}
                      color={pink400}
                      data={this.state.fitObject}
                      reduceFactor={5}
                      title="Cadence"
                      yAxisField="cadence"
                    />
                    <WorkoutChart
                      xAxisType={this.state.xAxisType}
                      color={brown400}
                      data={this.state.fitObject}
                      reduceFactor={5}
                      title="Température"
                      yAxisField="temperature"
                    />
                  </CardText>
                </Card>
              </div>
            : null}
            <Snackbar
              open={this.state.parsingFit}
              message="Analyse en cours..."
              autoHideDuration={999999}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

PageWorkoutEdit.propTypes = {
  params: React.PropTypes.object,
};
