import { Groups } from './groups';

export const insert = new ValidatedMethod({
  name: 'groups.insert',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run(group) {
    Groups.insert(group);
  },
});

export const update = new ValidatedMethod({
  name: 'groups.update',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id, obj }) {
    Groups.update(_id, { $set: obj });
  },
});

export const remove = new ValidatedMethod({
  name: 'groups.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Groups.remove(_id);
  },
});
