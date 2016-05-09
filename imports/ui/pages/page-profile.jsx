import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import reactMixin from 'react-mixin';
import { sometLightTheme, pageActionStyle, planCardTextStyle } from '../tools/themes.js';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';
import { Groups } from '../../api/groups/groups';

export class PageProfile extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
  }

  getMeteorData() {
    const data = {};
    data.user = [];
    const { username } = this.props.params;
    console.log(username);
    const userSubscription = Meteor.subscribe('this-user-and-groups-by-username', username);
    if (userSubscription.ready()) {
      data.user = Meteor.users.findOne({ username });
      this.canEdit = data.user._id === Meteor.userId();
      let canView = false;

      if (data.user.profile.groups) {
        data.user.profile.groups.map(groupId => {
          const group = Groups.findOne(groupId);
          group.trainers.map(id => {
            if (id === Meteor.userId()) {
              canView = true;
            }
            return id;
          });
          group.athletes.map(id => {
            if (id === Meteor.userId()) {
              canView = true;
            }
            return id;
          });
        });
      }

      this.canView = this.canEdit || canView;

      if (!this.canView) {
        this.goBack();
      }
    }
    return data;
  }

  logout() {
    Meteor.logout(() => browserHistory.push('/action/login'));
  }

  connectWithStrava() {
    const options = {
      requestPermissions: ['email'],
      redirectUrl: '/home',
    };
    Meteor.loginWithStrava(options);
  }

  render() {
    return (
      <div className="tab-content">
        {this.canEdit ?
          <div>
            <FlatButton
              label="Paramètres"
              style={pageActionStyle}
              icon={<FontIcon className="material-icons">settings</FontIcon>}
            />
            <FlatButton
              label="Déconnexion"
              style={pageActionStyle}
              onClick={this.logout}
              icon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
            />
          </div>
        : null}
        {this.canView ?
          <div>
            <div className="row">
              <div className="col s12">
                <span className="big-title light">
                  {this.data.user.profile.fullName}
                </span>
                <br />
                <span className="f18p mt5pm">
                  @{this.data.user.username}
                </span>
              </div>
            </div>
            <MuiThemeProvider muiTheme={sometLightTheme}>
              <div className="row">
                <div className="col s12 m6">
                  <Card initiallyExpanded>
                    <CardHeader
                      title="Services externes"
                      subtitle="Pour une meilleure expérience"
                      actAsExpander
                      showExpandableButton
                    />
                    <List expandable>
                      <ListItem
                        leftAvatar={<Avatar>S</Avatar>}
                        rightIcon={
                          Meteor.user().services.strava ?
                            null
                          :
                            <FontIcon
                              className="material-icons"
                              onTouchTap={this.connectWithStrava}
                            >
                              link
                            </FontIcon>
                        }
                        primaryText={
                          Meteor.user().services.strava ?
                            'Connecté avec Strava'
                          :
                            'Strava'
                        }
                        secondaryText="Pour synchroniser tous vos rides"
                      />
                      <ListItem
                        leftAvatar={<Avatar>G</Avatar>}
                        rightIcon={
                          Meteor.user().services.google ?
                            null
                          :
                            <FontIcon
                              className="material-icons"
                              onTouchTap={this.connectWithGoogle}
                            >
                              link
                            </FontIcon>
                        }
                        primaryText={
                          Meteor.user().services.google ?
                            'Connecté avec Google'
                          :
                            'Google'
                        }
                        secondaryText="Pour synchroniser votre calendrier"
                      />
                    </List>
                  </Card>
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        : null}
      </div>
    );
  }
}

reactMixin(PageProfile.prototype, ReactMeteorData);

PageProfile.propTypes = {
  params: React.PropTypes.object,
};
