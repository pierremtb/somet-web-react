import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Plans } from '../../api/plans/plans';
import { dispDate, dispDuration, dispDayName, dispSupport, dispType } from '../tools/helpers.js';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import reactMixin from 'react-mixin';
import { Loading } from '../components/loading.jsx';
import { lightWhite, white, yellow200 } from 'material-ui/styles/colors';
import { sometLightTheme, pageActionStyle, planCardTextStyle } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import moment from 'moment';

export class PagePlan extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
    this.editPlan = this.editPlan.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getMeteorData() {
    const data = {};
    const id = this.props.params.id;
    const handle = Meteor.subscribe('this-plan', id);
    if (handle.ready()) {
      data.plan = Plans.findOne({ _id: id });
      this.canEdit = data.plan.owner === Meteor.userId();
      this.canView = this.canEdit || data.plan.targetedUser === Meteor.userId();

      if (!this.canView) {
        this.goBack();
      }
    }
    return data;
  }

  getTitle(date, key) {
    return `${dispDayName(key)} ${moment(date).add(key, 'days').format('DD/MM')}`;
  }

  editPlan() {
    Session.set('planToEdit', this.data.plan);
    const url = `/group/${this.props.params.group}/athlete/` +
      `${this.props.params.athlete}/plan/edit/${this.props.params.id}`;
    browserHistory.push(url);
  }

  goBack() {
    const { group, athlete } = this.props.params;
    browserHistory.push(`/group/${group}/athlete/${athlete}/plans`);
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
              onClick={this.editPlan}
              style={pageActionStyle}
              icon={<FontIcon className="material-icons">edit</FontIcon>}
            />
          : null}
        </div>
        {this.data.plan ?
          <div className="row">
            <div className="col s12">
              <span className="big-title white">
                Semaine du {dispDate(this.data.plan.mondayDate)}
              </span>
              <br />
              <p
                className="under-big-title"
                style={{ color: lightWhite }}
              >
                {this.data.plan.title} <br />
                Durée totale : {dispDuration(this.data.plan.totalDuration)}
              </p>
            </div>
            <MuiThemeProvider muiTheme={sometLightTheme}>
              <div className="space_top row">
                {this.data.plan.days.map((day, key) => (
                  <div className="col s6 m4 space_bottom">
                    <Card
                      initiallyExpanded
                      style={{
                        background: day.type === 'wk' ? yellow200 : white,
                        // height: '15rem',
                        overflow: 'auto',
                      }}
                    >
                      <CardHeader
                        title={this.getTitle(this.data.plan.mondayDate, key)}
                        subtitle={dispType(day.type)}
                        actAsExpander
                        showExpandableButton
                      />
                      {day.type === 'nth' ?
                        <CardText expandable style={planCardTextStyle}>
                          <p><br /></p>
                          <p><br /></p>
                          <p><br /></p>
                        </CardText>
                      :
                        <CardText expandable style={planCardTextStyle}>
                          <p>{dispSupport(day.support)}</p>
                          <p>{dispDuration(day.duration)}</p>
                          <p>{day.description}</p>
                        </CardText>
                      }
                    </Card>
                  </div>
                ))}
              </div>
            </MuiThemeProvider>
          </div>
        : <Loading />}
      </div>
    );
  }
}

reactMixin(PagePlan.prototype, ReactMeteorData);

PagePlan.propTypes = {
  params: React.PropTypes.object,
};

