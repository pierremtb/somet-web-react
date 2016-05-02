import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import reactMixin from 'react-mixin';
import { sometLightTheme,
  pageActionStyle, textFieldStyleDark, hintTextFieldStyleDark } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Paper from 'material-ui/Paper';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import FontIcon from 'material-ui/FontIcon';
import { lightBlack, transparent } from 'material-ui/styles/colors';
import RegexTextField from '../components/regex-text-field.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import { Groups } from '../../api/groups/groups';

export class PageGroupEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAthletes: [],
      selectedTrainers: [Meteor.userId(), "QrjbrKPD6Jj6SR43Q"],
    };

    this.getMeteorData = this.getMeteorData.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getMeteorData() {
    const data = {};
    data.groups = [];
    data.users = [];
    const groupsSubscription = Meteor.subscribe('all-groups-names');
    const usersSubscription = Meteor.subscribe('all-users-username-profile');
    if (groupsSubscription.ready() && usersSubscription.ready()) {
      const groups = Groups.find().fetch();
      const users = Meteor.users.find().fetch();
      groups.map(g => {
        data.groups.push(g.name);
        return g;
      });
      users.map(u => {
        data.users.push(u.username);
        return u;
      });
    }
    return data;
  }

  goBack() {
    const { group, athlete } = this.props.params;
    browserHistory.push(`/group/${group}/athlete/${athlete}/dashboard`);
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
            style={pageActionStyle}
            icon={<FontIcon className="material-icons">save</FontIcon>}
          />
        </div>
        <div className="row">
          <div className="col s12">
            <RegexTextField
              hintText="Nom du groupe (ex: team-rocket)"
              inputStyle={textFieldStyleDark}
              style={textFieldStyleDark}
              hintStyle={hintTextFieldStyleDark}
              errorRegex="3-16 caractères. Lettres minuscules et '-'"
              errorUnavailable="Ce nom est déjà pris"
              regex={/^[a-z0-9-]{3,16}$/}
              unavailableValues={this.data.groups}
              fullWidth
            />
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
                    {this.state.selectedTrainers.map(id => (
                      <ListItem
                        leftAvatar={
                          <Avatar>
                            {Meteor.users.findOne(id).profile.fullName.charAt(0)}
                          </Avatar>
                        }
                        rightIcon={id !== Meteor.userId() ?
                          <FontIcon className="material-icons">delete</FontIcon>
                        : null}
                        primaryText={Meteor.users.findOne(id).profile.fullName}
                        secondaryText={`@${Meteor.users.findOne(id).username}`}
                      />
                    ))}
                  </List>

                  <AutoComplete
                    hintText="Pseudo..."
                    dataSource={this.data.users}
                    floatingLabelText="Ajouter un entraineur"
                    fullWidth
                  />
                </Paper>
              : null}
            </MuiThemeProvider>
          </div>
          <div className="col s12 m6">
            <h3>Athlètes</h3>
          </div>
        </div>
      </div>
    );
  }
}

reactMixin(PageGroupEdit.prototype, ReactMeteorData);

PageGroupEdit.propTypes = {
  params: React.PropTypes.object,
};
