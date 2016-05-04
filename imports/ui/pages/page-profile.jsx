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

export class PageProfile extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
  }

  getMeteorData() {
    const data = {};
    data.user = [];
    const { username } = this.props.params;
    const userSubscription = Meteor.subscribe('this-user-and-groups-by-username', username);
    if (userSubscription.ready()) {
      data.user = Meteor.users.findOne({ username });
      this.canEdit = data.user._id === Meteor.userId();
      let canView = false;

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
        : null}
      </div>
    );
  }
}

reactMixin(PageProfile.prototype, ReactMeteorData);

PageProfile.propTypes = {
  params: React.PropTypes.object,
};
