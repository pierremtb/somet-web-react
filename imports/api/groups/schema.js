import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertGroupSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this group',
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    optional: true,
  },
  name: {
    type: String,
    label: 'The name of the group',
  },
  trainers: {
    type: Array,
  },
  'trainers.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  athletes: {
    type: Array,
  },
  'athletes.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  seeOtherAthletesWorkouts: {
    type: Boolean,
    label: 'Wheter an athlete can view the other athletes workouts',
  },
  seeOtherAthletesPlans: {
    type: Boolean,
    label: 'Wheter an athlete can view the other athletes plans',
  },
});

export const groupSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this group',
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  name: {
    type: String,
    label: 'The name of the group',
  },
  trainers: {
    type: Array,
  },
  'trainers.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  athletes: {
    type: Array,
  },
  'athletes.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  seeOtherAthletesWorkouts: {
    type: Boolean,
    label: 'Wheter an athlete can view the other athletes workouts',
  },
  seeOtherAthletesPlans: {
    type: Boolean,
    label: 'Wheter an athlete can view the other athletes plans',
  },
});
