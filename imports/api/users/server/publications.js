Meteor.publish('allUsers', () => Meteor.users.find());

Meteor.publish('getUserData', function getUserData() {
  return Meteor.users.find({ _id: this.userId });
});
