import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertPlanSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the trainer that created this plan',
  },
  targetedUser: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the athlete that is targeted by this plan',
  },
  title: {
    type: String,
    optional: true,
    label: 'The title of this plan',
  },
  mondayDate: {
    type: Date,
    label: 'The date of the monday of this plan',
  },
  totalDuration: {
    type: Number,
    label: 'The total duration of the week workouts in seconds, in this plan',
  },
  days: {
    type: [Object],
    minCount: 7,
    maxCount: 7,
  },
  'days.$.type': {
    type: String,
  },
  'days.$.description': {
    type: String,
    optional: true,
  },
  'days.$.support': {
    type: String,
    optional: true,
  },
  'days.$.duration': {
    type: Number,
    optional: true,
  },
  'days.$.eventId': {
    type: String,
    optional: true,
  },
});

export const planSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the trainer that created this plan',
  },
  targetedUser: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the athlete that is targeted by this plan',
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  title: {
    type: String,
    label: 'The title of this plan',
    optional: true,
  },
  mondayDate: {
    type: Date,
    label: 'The date of the monday of this plan',
  },
  totalDuration: {
    type: Number,
    label: 'The total duration of the week workouts in seconds, in this plan',
  },
  days: {
    type: [Object],
    minCount: 7,
    maxCount: 7,
  },
  'days.$.type': {
    type: String,
  },
  'days.$.description': {
    type: String,
    optional: true,
  },
  'days.$.support': {
    type: String,
    optional: true,
  },
  'days.$.duration': {
    type: Number,
    optional: true,
  },
  'days.$.eventId': {
    type: String,
    optional: true,
  },
});


export const updatePlanSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  plan: {
    type: Object,
    label: 'The CR scales of this workout',
    blackbox: true,
    optional: true,
  },
});
