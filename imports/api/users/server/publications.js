Meteor.publish('allUsers', () => Meteor.users.find());

Meteor.publish('all-users-username-profile', () =>
  Meteor.users.find({}, { fields: { username: 1, profile: 1 } })
);

Meteor.publish('getUserData', function getUserData() {
  return Meteor.users.find({ _id: this.userId });
});
