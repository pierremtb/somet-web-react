import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import reactMixin from 'react-mixin';
import { sometLightTheme, pageActionStyle } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';
import { Groups } from '../../api/groups/groups';

export class PageGroup extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
    this.goBack = this.goBack.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }

  getMeteorData() {
    const data = {};
    data.group = [];
    data.users = [];
    const { group } = this.props.params;
    const groupSubscription = Meteor.subscribe('this-group-by-name', group);
    const usersSubscription = Meteor.subscribe('all-users-in-this-group-by-name', group);
    if (groupSubscription.ready() && usersSubscription.ready()) {
      data.group = Groups.findOne({ name: group });
      data.users = Meteor.users.find().fetch();
      this.canEdit = data.group.owner === Meteor.userId();
      let canView = false;
      data.users.map(user => {
        if (user._id === Meteor.userId()) {
          canView = true;
        }
        return user;
      });
      this.canView = this.canEdit || canView;

      if (!this.canView) {
        this.goBack();
      }
    }
    return data;
  }

  goBack() {
    browserHistory.push('/feed');
  }

  editGroup() {
    Session.set('groupToEdit', this.data.group);
    browserHistory.push(`/group/${this.props.params.group}/edit`);
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
              style={pageActionStyle}
              onClick={this.editGroup}
              icon={<FontIcon className="material-icons">edit</FontIcon>}
            />
          : null}
        </div>
        <div className="row">
          <div className="col s12">
            <span className="big-title white">
              {this.data.group.name}
            </span>
          </div>
          <div className="col s12">
            <h2>Membres</h2>
          </div>
          <div className="col s12 m6">
            <h3>Entraineurs</h3>
            <MuiThemeProvider muiTheme={sometLightTheme}>
              {this.data.users.length > 0 ?
                <Paper>
                  <List>
                    {this.data.group.trainers.map(id => (
                      <ListItem
                        leftAvatar={
                          <Avatar>
                            {Meteor.users.findOne(id).profile.fullName.charAt(0)}
                          </Avatar>
                        }
                        primaryText={Meteor.users.findOne(id).profile.fullName}
                        secondaryText={`@${Meteor.users.findOne(id).username}`}
                      />
                    ))}
                  </List>
                </Paper>
              : null}
            </MuiThemeProvider>
          </div>
          <div className="col s12 m6">
            <h3>Athlètes</h3>
            <MuiThemeProvider muiTheme={sometLightTheme}>
              {this.data.users.length > 0 ?
                <Paper>
                  <div>
                    <List>
                      {this.data.group.athletes.map(id => (
                        <ListItem
                          leftAvatar={
                            <Avatar>
                              {Meteor.users.findOne(id).profile.fullName.charAt(0)}
                            </Avatar>
                          }
                          primaryText={Meteor.users.findOne(id).profile.fullName}
                          secondaryText={`@${Meteor.users.findOne(id).username}`}
                        />
                      ))}
                    </List>
                  </div>
                </Paper>
                : null}
            </MuiThemeProvider>
          </div>
          <div className="col s12">
            <h2>Options</h2>
          </div>
          <div className="col s12 m6 space_top">
            <p>Les athlètes
              {this.data.group.seeOtherAthletesPlans ? ' peuvent ' : ' ne peuvent pas '}
              consulter les plans des autres.
            </p>
            <p>Les athlètes
              {this.data.group.seeOtherAthletesWorkouts ? ' peuvent ' : ' ne peuvent pas '}
              consulter les entrainements des autres.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

reactMixin(PageGroup.prototype, ReactMeteorData);

PageGroup.propTypes = {
  params: React.PropTypes.object,
};
