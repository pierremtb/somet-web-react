import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class GroupsCollection extends Mongo.Collection {
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

export const Groups = new GroupsCollection('Groups');

Groups.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Groups.schema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this group',
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  name: {
    type: String,
    label: 'The name of the group',
  },
  trainers: {
    type: Array,
  },
  'trainers.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  athletes: {
    type: Array,
  },
  'athletes.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  seeOtherAthletesWorkouts: {
    type: Boolean,
    label: 'Wheter an athlete can view the other athletes workouts',
  },
  seeOtherAthletesPlans: {
    type: Boolean,
    label: 'Wheter an athlete can view the other athletes plans',
  },
});

Groups.attachSchema(Groups.schema);

Groups.helpers({});
