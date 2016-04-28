import { Events } from './events';

export const insert = new ValidatedMethod({
  name: 'events.insert',
  validate: new SimpleSchema({
    startDate: { type: Date },
  }).validator(),
  run(event) {
    Events.insert(event);
  },
});

export const update = new ValidatedMethod({
  name: 'events.update',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id, obj }) {
    Events.update(_id, { $set: obj });
  },
});

export const remove = new ValidatedMethod({
  name: 'events.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Events.remove(_id);
  },
});
