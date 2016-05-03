import { Groups } from '../../groups/groups';
import { check } from 'meteor/check';

Meteor.publish('allUsers', () => Meteor.users.find());

Meteor.publish('all-users-username-profile', () =>
  Meteor.users.find({}, { fields: { username: 1, profile: 1 } })
);

Meteor.publish('getUserData', function getUserData() {
  return Meteor.users.find({ _id: this.userId });
});

Meteor.publish('all-users-in-this-group-by-name', name => {
  check(name, String);
  const usersIds = [];
  const group = Groups.findOne({ name });
  group.trainers.map(id => usersIds.push(id));
  group.athletes.map(id => usersIds.push(id));
  return Meteor.users.find({ _id: { $in: usersIds } });
});

Meteor.publish('this-user-and-groups-by-username', username => {
  check(username, String);
  const user = Meteor.users.findOne({ username });
  let groups;
  if (user) {
    groups = Groups.find({ _id: { $in: user.profile.groups } });
  }
  return [Meteor.users.find({ username }), groups];
});
