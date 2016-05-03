import { Mongo } from 'meteor/mongo';
import { groupSchema } from './schema';

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

Groups.schema = groupSchema;

Groups.attachSchema(Groups.schema);

Groups.helpers({});
