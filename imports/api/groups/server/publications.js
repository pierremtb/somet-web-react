import { Groups } from '../groups';
import { check } from 'meteor/check';

Meteor.publish('my-groups', function getMyGroup() {
  const usr = Meteor.users.findOne(this.userId);
  const groupIds = usr.profile.groups ? usr.profile.groups : [];
  return Groups.find({ _id: { $in: groupIds } });
});

Meteor.publish('this-group-name', name => {
  check(name, String);
  return Groups.find({ name });
});
