import { Notifications } from '../notifications';

Meteor.publish('notificationsOfCurrentUser', function getNotifs() {
  return Notifications.find({ owner: this.userId });
});
