import { Plans } from './plans';
import { insertPlanSchema } from './schema';

export const insert = new ValidatedMethod({
  name: 'plans.insert',
  validate: insertPlanSchema.validator(),
  run(plan) {
    Plans.insert(plan);
  },
});

export const update = new ValidatedMethod({
  name: 'plans.update',
  validate() {},
  run({ _id, plan }) {
    Plans.update(_id, { $set: plan });
  },
});

export const remove = new ValidatedMethod({
  name: 'plans.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Plans.remove(_id);
  },
});
