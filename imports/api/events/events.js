import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class EventsCollection extends Mongo.Collection {
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

export const Events = new EventsCollection('Events');

Events.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Events.schema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this event',
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  name: {
    type: String,
    label: 'The name of the event',
  },
  date: {
    type: Date,
    label: 'The date of the event',
  },
  place: {
    type: String,
    label: 'The place of the event',
  },
  goal: {
    type: String,
    label: 'The goal of the event',
    optional: true,
  },
  description: {
    type: String,
    label: 'The description of the event',
    optional: true,
  },
  class: {
    type: String,
    allowedValues: ['first', 'second', 'preparation'],
    label: 'Wether it\'s a first class event, or a pr',
  },
});

Events.attachSchema(Events.schema);

Events.helpers({});
