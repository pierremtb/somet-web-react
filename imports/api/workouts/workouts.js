import { Mongo } from 'meteor/mongo';
import { workoutSchema } from './schema';

class WorkoutsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    return super.insert(ourDoc, callback);
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  upsert(selector, modifier) {
    return super.update(selector, modifier, { upsert: true });
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export const Workouts = new WorkoutsCollection('Workouts');

Workouts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Workouts.schema = workoutSchema;

Workouts.publicFields = {
  owner: 1,
  createdAt: 1,
  title: 1,
  description: 1,
  startDate: 1,
  duration: 1,
  distance: 1,
  support: 1,
  cr: 1,
  fitLinked: 1,
  fitValues: 1,
  speed: 1,
  power: 1,
  cadence: 1,
  ascent: 1,
  descent: 1,
  calories: 1,
  stravaId: 1,
};

Workouts.attachSchema(Workouts.schema);

Workouts.helpers({});
