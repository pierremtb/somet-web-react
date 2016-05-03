import { Groups } from './groups';
import { insertGroupSchema } from './schema';

export const insert = new ValidatedMethod({
  name: 'groups.insert',
  validate: insertGroupSchema.validator(),
  run(group) {
    return Groups.insert(group);
  },
});

export const update = new ValidatedMethod({
  name: 'groups.update',
  validate() {},
  run({ _id, group }) {
    Groups.update(_id, { $set: group });
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
