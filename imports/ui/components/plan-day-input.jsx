import React from 'react';
import { Session } from 'meteor/session';
import moment from 'moment';
import { dispDayName } from '../tools/helpers.js';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { white, yellow200 } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export class PlanDayInput extends React.Component {
  constructor(props) {
    super(props);

    const dayObj = Session.get(`day${this.props.dayIndex}`);
    this.state = {
      disabled: dayObj.type === 'nth',
      typeValue: dayObj.type,
      supportValue: dayObj.support,
      durationValue: dayObj.duration,
      descriptionValue: dayObj.description,
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSupportChange = this.handleSupportChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.updateSession = this.updateSession.bind(this);
  }

  getSubtitle(mondayDate, dayIndex) {
    return moment(mondayDate).add(dayIndex, 'days').format('DD/MM/YYYY');
  }

  handleTypeChange(event, index, typeValue) {
    this.setState({ typeValue });
    if (typeValue === 'wk') {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }

    this.updateSession();
  }

  handleSupportChange(event, index, supportValue) {
    this.setState({ supportValue });
    this.updateSession();
  }

  handleDescriptionChange(descriptionValue) {
    this.setState({ descriptionValue });
    this.updateSession();
  }

  handleDurationChange(event, index, durationValue) {
    this.setState({ durationValue });
    this.updateSession();
  }

  updateSession() {
    Meteor.setTimeout(() => {
      let dayObj = {};
      if (this.state.disabled) {
        dayObj = {
          type: this.state.typeValue,
        };
      } else {
        dayObj = {
          description: this.state.descriptionValue,
          type: this.state.typeValue,
          support: this.state.supportValue,
          duration: this.state.durationValue,
        };
      }

      Session.set(`day${this.props.dayIndex}`, dayObj);
    }, 200);
  }

  render() {
    return (
      <div className="col s6 m4 space_bottom">
        <Card
          style={{
            background: this.state.typeValue === 'wk' ? yellow200 : white,
            height: '30rem',
            overflow: 'auto',
          }}
        >
          <CardHeader
            title={dispDayName(this.props.dayIndex)}
            subtitle={() => this.getSubtitle(this.props.mondayDate, this.props.dayIndex)}
          />
          <CardText>

            <SelectField
              value={this.state.typeValue}
              onChange={this.handleTypeChange}
              floatingLabelText="Type"
              fullWidth
            >
              <MenuItem value="nth" primaryText="Repos" />
              <MenuItem value="wk" primaryText="Entrainement" />
            </SelectField>

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

          </CardText>
        </Card>
      </div>
    );
  }
}

PlanDayInput.propTypes = {
  dayIndex: React.PropTypes.number,
  mondayDate: React.PropTypes.instanceOf(Date),
};
