import { composeWithTracker } from 'react-komposer';
import { AppNavigation } from '../components/app-navigation.jsx';
import { Groups } from '../../../imports/api/groups/groups';

function composer(props, onData) {
  const groupsSubscription = Meteor.subscribe('my-groups');
  const usersSubscription = Meteor.subscribe('allUsers');
  if (groupsSubscription.ready() && usersSubscription.ready()) {
    const groupsIds = Meteor.user().profile.groups ? Meteor.user().profile.groups : [];
    const myGroups = Groups.find({ _id: { $in: groupsIds } }).fetch();
    myGroups.map((group) => {
      const updatedGroup = group;
      updatedGroup.athletes = updatedGroup.athletes.map((athlete) => Meteor.users.findOne(athlete));
      return updatedGroup;
    });

    onData(null, {
      myGroups,
      isUser: Meteor.user(),
    });
  }
}

export default composeWithTracker(composer)(AppNavigation);
