import { Workouts } from './workouts';
import { insertWorkoutSchema } from './schema';

export const insert = new ValidatedMethod({
  name: 'workouts.insert',
  validate: insertWorkoutSchema.validator(),
  run(workout) {
    Workouts.insert(workout);
  },
});

export const update = new ValidatedMethod({
  name: 'workouts.update',
  validate() {},
  run({ _id, workout }) {
    Workouts.update(_id, { $set: workout });
  },
});

export const remove = new ValidatedMethod({
  name: 'workouts.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Workouts.remove(_id);
  },
});
