import { Notifications } from './notifications';

export const insert = new ValidatedMethod({
  name: 'notifications.insert',
  validate: new SimpleSchema({
    startDate: { type: Date },
  }).validator(),
  run(workout) {
    Notifications.insert(workout);
  },
});

export const update = new ValidatedMethod({
  name: 'notifications.update',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id, obj }) {
    Notifications.update(_id, { $set: obj });
  },
});

export const remove = new ValidatedMethod({
  name: 'notifications.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Notifications.remove(_id);
  },
});
