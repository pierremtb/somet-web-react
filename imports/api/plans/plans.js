import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { planSchema } from './schema';

class PlansCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    if (super.findOne({ mondayDate: ourDoc.mondayDate, targetedUser: ourDoc.targetedUser })) {
      throw new Error('Un plan existe déjà pour cette semaine');
    } else {
      return super.insert(ourDoc, callback);
    }
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export const Plans = new PlansCollection('Plans');

Plans.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Plans.schema = planSchema;

Plans.attachSchema(Plans.schema);

Plans.helpers({});
