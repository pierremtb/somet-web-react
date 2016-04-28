import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class NotificationsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    return super.insert(ourDoc, callback);
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export const Notifications = new NotificationsCollection('Notifications');

Notifications.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Notifications.schema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this notification',
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  read: {
    type: Boolean,
    label: 'Wether it is read or not',
  },
  type: {
    type: String,
    label: 'The type of this notification',
  },
  value: {
    type: String,
    label: 'The value of this notification',
  },
});

Notifications.attachSchema(Notifications.schema);

Notifications.helpers({});
