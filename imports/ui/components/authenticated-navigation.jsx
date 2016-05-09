import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { ListItem } from 'material-ui/List';
import { primaryDarkColor } from '../tools/themes.js';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import { SelectableList } from './selectable-list.jsx';

export function AuthenticatedNavigation(props = { list: [] }) {
  function openUserView(groupName, athleteName) {
    let currentTab;
    if (Session.get('selectedAthleteTabName')) {
      currentTab = Session.get('selectedAthleteTabName');
    } else {
      currentTab = 'dashboard';
    }
    const url = `/group/${groupName}/athlete/${athleteName}/${currentTab}`;
    browserHistory.push(url);
  }

  function openGroupView(groupName) {
    browserHistory.push(`/group/${groupName}/view`);
  }

  function openFeed() {
    browserHistory.push('/feed');
  }

  function openNotifications() {
    browserHistory.push('/notifications');
  }

  function amIn(objsArray) {
    const me = objsArray.filter((obj) => obj._id === Meteor.userId());
    return me.length > 0;
  }

  function withoutMe(objsArray) {
    return objsArray.filter(a => a._id !== Meteor.user()._id);
  }

  function openMyProfile() {
    browserHistory.push(`/profile/${Meteor.user().username}`);
  }

  return (
    <div className="side-nav" style={{ background: primaryDarkColor }}>
      <img src="/somet-logo.png" alt="Logo Somet" id="somet-logo" />
      <SelectableList defaultValue={'feed'}>
        <Subheader>Compte</Subheader>
        <ListItem
          primaryText="Flux"
          value={'feed'}
          onTouchTap={openFeed}
          leftIcon={<FontIcon className="material-icons">home</FontIcon>}
        />
        <ListItem
          primaryText="Notifications"
          value={'notifications'}
          onTouchTap={openNotifications}
          leftIcon={<FontIcon className="material-icons">notifications</FontIcon>}
        />
        <ListItem
          primaryText="Profil"
          value={'profile'}
          onTouchTap={() => openMyProfile()}
          leftIcon={<FontIcon className="material-icons">account_circle</FontIcon>}
        />
        <Subheader>Groupes</Subheader>
        {props.list.map(group => (
          <ListItem
            primaryText={group.name}
            value={group.name}
            leftIcon={<FontIcon className="material-icons">group_work</FontIcon>}
            initiallyOpen
            onTouchTap={() => openGroupView(group.name)}
            nestedItems={amIn(group.athletes) ?
                [<ListItem
                  value={Meteor.user().username}
                  primaryText="Moi"
                  onTouchTap={() => openUserView(group.name, Meteor.user().username)}
                  leftIcon={<FontIcon className="material-icons">person_outline</FontIcon>}
                />,
                  withoutMe(group.athletes).length > 0 &&
                    (group.seeOtherAthletesPlans || group.seeOtherAthletesWorkouts) ?
                    <ListItem
                      primaryText="Autres athlètes"
                      value="other_athletes"
                      leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                      initiallyOpen
                      primaryTogglesNestedList
                      nestedItems={withoutMe(group.athletes).map((athlete, key) => (
                        <ListItem
                          value={athlete.username}
                          primaryText={athlete.profile.fullName}
                          onTouchTap={() => openUserView(group.name, athlete.username)}
                          leftIcon={<FontIcon className="material-icons">person</FontIcon>}
                        />
                      ))}
                    />
                  : null,
                ]
              :
                group.athletes.map(athlete => (
                  <ListItem
                    value={athlete.username}
                    primaryText={athlete.profile.fullName}
                    onTouchTap={() => openUserView(group.name, athlete.username)}
                    leftIcon={<FontIcon className="material-icons">person</FontIcon>}
                  />
                ))}
          />
          )
        )}
        <ListItem
          primaryText="Creer un groupe"
          value={'new_group'}
          onTouchTap={() => browserHistory.push('/group/new')}
          leftIcon={<FontIcon className="material-icons">add</FontIcon>}
        />
      </SelectableList>
    </div>
  );
}

AuthenticatedNavigation.propTypes = {
  list: React.PropTypes.array,
};
