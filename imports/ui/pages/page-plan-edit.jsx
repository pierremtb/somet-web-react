import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PlanDayInput } from '../../ui/components/plan-day-input.jsx';
import * as Plans from '../../api/plans/methods';
import { dispDate, getNextMonday } from '../tools/helpers.js';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {
  sometLightTheme,
  pageActionStyle,
  datePickerFieldStyle,
  datePickerStyle } from '../tools/themes.js';

function disableAllExceptMondays(date) {
  return date.getDay() !== 1;
}

export class PagePlanEdit extends React.Component {
  constructor(props) {
    super(props);

    const pl = Session.get('planToEdit');

    if (pl) {
      for (let i = 0; i < 7; i++) {
        Session.set(`day${i}`, {
          type: pl.days[i].type ? pl.days[i].type : 'nth',
          support: pl.days[i].support ? pl.days[i].support : '',
          duration: pl.days[i].duration ? pl.days[i].duration : 0,
          description: pl.days[i].description ? pl.days[i].description : '',
        });
      }
      this.state = {
        mondayDateValue: pl.mondayDate ? pl.mondayDate : getNextMonday(),
        titleValue: pl.title ? pl.title : '',
      };
    } else {
      for (let i = 0; i < 7; i++) {
        Session.set(`day${i}`, {
          type: 'nth',
          support: '',
          duration: 0,
          description: '',
        });
      }
      this.state = {
        mondayDateValue: getNextMonday(),
        titleValue: '',
      };
    }

    this.handleMondayDateChange = this.handleMondayDateChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.savePlan = this.savePlan.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleMondayDateChange(event, mondayDateValue) {
    this.setState({ mondayDateValue });
  }

  handleTitleChange(e) {
    this.setState({ titleValue: e.target.value });
  }

  goBack() {
    const { group, athlete } = this.props.params;
    let url = `/group/${group}/athlete/${athlete}/`;
    if (Session.get('planToEdit')) {
      url += `plan/view/${Session.get('planToEdit')._id}`;
    } else {
      url += 'plans';
    }
    browserHistory.push(url);
    Session.set('planToEdit', false);
  }

  savePlan() {
    let totalDuration = 0;
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = Session.get(`day${i}`) ? Session.get(`day${i}`) : null;
      if (day) {
        totalDuration += day.duration ? day.duration : 0;
      }
      days.push(day);
    }
    const plan = {
      totalDuration,
      days,
      mondayDate: this.state.mondayDateValue,
      title: this.state.titleValue,
      owner: Meteor.userId(),
      targetedUser: Meteor.users.findOne({ username: this.props.params.athlete })._id,
    };
    if (Session.get('planToEdit')) {
      Plans.update.call({ _id: Session.get('planToEdit')._id, plan }, (e) => {
        if (!e) {
          Session.set('planToEdit', false);
          const url = `/group/${this.props.params.group}/athlete/` +
            `${this.props.params.athlete}/plan/view/${this.props.params.id}`;
          browserHistory.push(url);
        }
      });
    } else {
      Plans.insert.call(plan, (e) => {
        if (e) {
          alert('Erreur');
        } else {
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
            onClick={this.goBack}
            icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
          />
          <FlatButton
            label="Enregistrer"
            onClick={() => this.savePlan()}
            style={pageActionStyle}
            icon={<FontIcon className="material-icons">save</FontIcon>}
          />
        </div>
        <div className="row">
          <div className="col s12">
            {Session.get('planToEdit') ?
              <span className="big-title white">
                Semaine du {dispDate(Session.get('planToEdit').mondayDate)}
              </span>
            :
              <div>
                <span className="big-title">Semaine du </span>
                <DatePicker
                  hintText="Portrait Inline Dialog"
                  container="inline"
                  value={this.state.mondayDateValue}
                  onChange={this.handleMondayDateChange}
                  shouldDisableDate={disableAllExceptMondays}
                  textFieldStyle={datePickerFieldStyle}
                  style={datePickerStyle}
                  autoOk
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
          <div className="row space_top">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <PlanDayInput mondayDate={this.state.mondayDateValue} dayIndex={i} />
            ))}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

PagePlanEdit.propTypes = {
  params: React.PropTypes.object,
};
