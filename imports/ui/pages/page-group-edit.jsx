import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import reactMixin from 'react-mixin';
import { sometLightTheme,
  pageActionStyle, textFieldStyleDark, hintTextFieldStyleDark } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RegexTextField from '../components/regex-text-field.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import { Groups } from '../../api/groups/groups';
import * as UsersMethods from '../../api/users/methods';
import * as GroupsMethods from '../../api/groups/methods';

export class PageGroupEdit extends React.Component {
  constructor(props) {
    super(props);

    const group = Session.get('groupToEdit');

    if (group) {
      this.state = {
        name: group.name,
        athletes: group.athletes,
        seeOtherAthletesWorkouts: group.seeOtherAthletesWorkouts,
        seeOtherAthletesPlans: group.seeOtherAthletesPlans,
        trainers: group.trainers,
        searchText: '',
      };
    } else {
      this.state = {
        name: '',
        athletes: [],
        seeOtherAthletesWorkouts: true,
        seeOtherAthletesPlans: true,
        trainers: [Meteor.userId()],
        searchText: '',
      };
    }

    this.getMeteorData = this.getMeteorData.bind(this);
    this.goBack = this.goBack.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.handleNewTrainer = this.handleNewTrainer.bind(this);
    this.handleNewAthlete = this.handleNewAthlete.bind(this);
    this.getSelectableUsers = this.getSelectableUsers.bind(this);
    this.removeThisTrainer = this.removeThisTrainer.bind(this);
    this.removeThisAthlete = this.removeThisAthlete.bind(this);
    this.handleAllowSeePlansCheck = this.handleAllowSeePlansCheck.bind(this);
    this.handleAllowSeeWorkoutsCheck = this.handleAllowSeeWorkoutsCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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
        if (u._id !== Meteor.userId()) {
          data.users.push({
            id: u._id,
            text: u.username,
            value: `${u.profile.fullName} (@${u.username})`,
          });
        }
        return u;
      });
    }
    return data;
  }

  getSelectableUsers() {
    const { trainers, athletes } = this.state;
    const users = this.data.users;
    return users.filter(user =>
      trainers.indexOf(user.id) === -1 && athletes.indexOf(user.id) === -1
    );
  }

  goBack() {
    let url = '/';
    if (Session.get('groupToEdit')) {
      url += `group/${Session.get('groupToEdit').name}/view`;
    } else {
      url += 'feed';
    }
    browserHistory.push(url);
  }

  handleNewTrainer(chosenRequest, index) {
    if (index !== -1) {
      const trainers = this.state.trainers;
      trainers.push(chosenRequest.id);
      this.setState({ trainers, searchText: '' });
    }
  }

  handleNewAthlete(chosenRequest, index) {
    if (index !== -1) {
      const athletes = this.state.athletes;
      athletes.push(chosenRequest.id);
      this.setState({ athletes, searchText: '' });
    }
  }

  handleAllowSeePlansCheck(event, seeOtherAthletesPlans) {
    this.setState({ seeOtherAthletesPlans });
  }

  handleAllowSeeWorkoutsCheck(event, seeOtherAthletesWorkouts) {
    this.setState({ seeOtherAthletesWorkouts });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  removeThisTrainer(id) {
    const trainers = this.state.trainers.filter(t => t !== id);
    this.setState({ trainers });
  }

  removeThisAthlete(id) {
    const athletes = this.state.athletes.filter(t => t !== id);
    this.setState({ athletes });
  }

  saveGroup() {
    const { name, athletes, trainers,
      seeOtherAthletesWorkouts, seeOtherAthletesPlans } = this.state;
    const group = {
      owner: Meteor.userId(),
      name,
      athletes,
      trainers,
      seeOtherAthletesWorkouts,
      seeOtherAthletesPlans,
    };
    if (Session.get('groupToEdit')) {
      console.log(group);
      GroupsMethods.update.call({ _id: Session.get('groupToEdit')._id, group }, (e) => {
        if (!e) {
          Session.set('groupToEdit', false);
          browserHistory.push(`/group/${this.props.params.group}/view`);
        } else {
          console.log(e);
        }
      });
    } else {
      GroupsMethods.insert.call(group, (e, groupId) => {
        if (!e) {
          athletes.map(userId => {
            UsersMethods.addThisGroup.call({ userId, groupId });
            return userId;
          });
          trainers.map(userId => {
            UsersMethods.addThisGroup.call({ userId, groupId });
            return userId;
          });
          browserHistory.push('/feed');
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
            onClick={this.goBack}
            icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
          />
          <FlatButton
            label="Enregistrer"
            style={pageActionStyle}
            onClick={this.saveGroup}
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
              errorRegex="3-30 caractères. Lettres minuscules et '-'"
              errorUnavailable="Ce nom est déjà pris"
              regex={/^[a-z0-9-]{3,30}$/}
              unavailableValues={this.data.groups}
              value={this.state.name}
              onChange={this.handleNameChange}
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
                  <div className="space_left space_right">
                    <AutoComplete
                      ref="addTrainer"
                      hintText="Ajouter un entraineur..."
                      dataSource={this.getSelectableUsers()}
                      onNewRequest={this.handleNewTrainer}
                      maxSearchResults={5}
                      underlineShow={false}
                      searchText={this.state.searchText}
                      fullWidth
                    />
                  </div>
                  <Divider />
                  <List>
                    {this.state.trainers.map(id => (
                      <ListItem
                        leftAvatar={
                          <Avatar>
                            {Meteor.users.findOne(id).profile.fullName.charAt(0)}
                          </Avatar>
                        }
                        rightIcon={id !== Meteor.userId() ?
                          <FontIcon
                            className="material-icons"
                            onTouchTap={() => this.removeThisTrainer(id)}
                          >
                            delete
                          </FontIcon>
                        : null}
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
                  <div className="space_left space_right">
                    <AutoComplete
                      ref="addAthlete"
                      hintText="Ajouter un athlète..."
                      dataSource={this.getSelectableUsers()}
                      onNewRequest={this.handleNewAthlete}
                      maxSearchResults={5}
                      underlineShow={false}
                      searchText={this.state.searchText}
                      fullWidth
                    />
                  </div>
                  <Divider />
                  <div>
                    <List>
                      {this.state.athletes.map(id => (
                        <ListItem
                          leftAvatar={
                            <Avatar>
                              {Meteor.users.findOne(id).profile.fullName.charAt(0)}
                            </Avatar>
                          }
                          rightIcon={id !== Meteor.userId() ?
                            <FontIcon
                              className="material-icons"
                              onTouchTap={() => this.removeThisAthlete(id)}
                            >
                              delete
                            </FontIcon>
                          : null}
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
            <Checkbox
              label="Autoriser les athlètes à voir les plans des autres"
              onCheck={this.handleAllowSeePlansCheck}
              defaultChecked={this.state.seeOtherAthletesPlans}
            />
            <Checkbox
              label="Autoriser les athlètes à voir les entrainements des autres"
              onCheck={this.handleAllowSeeWorkoutsCheck}
              defaultChecked={this.state.seeOtherAthletesWorkouts}
            />
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
