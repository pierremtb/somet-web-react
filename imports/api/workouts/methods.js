import { Workouts } from './workouts';

export const insert = new ValidatedMethod({
  name: 'workouts.insert',
  validate: new SimpleSchema({
    startDate: { type: Date },
  }).validator(),
  run(workout) {
    Workouts.insert(workout);
  },
});

export const update = new ValidatedMethod({
  name: 'workouts.update',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id, obj }) {
    Workouts.update(_id, { $set: obj });
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
