import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertWorkoutSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this workout',
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  title: {
    type: String,
    label: 'The title of this workout',
  },
  description: {
    type: String,
    label: 'The description of this workout',
    optional: true,
  },
  startDate: {
    type: Date,
    label: 'The starting date of this workout',
  },
  duration: {
    type: Number,
    label: 'The duration in seconds of this workout',
  },
  distance: {
    type: Number,
    label: 'The distance in meters of this workout',
    decimal: true,
  },
  support: {
    type: String,
    label: 'The code of the support of this workout',
  },
  cr: {
    type: Object,
    label: 'The CR scales of this workout',
    blackbox: true,
    optional: true,
  },
  fitLinked: {
    type: Boolean,
    label: 'Wether there is a FIT file linked to this workout',
  },
  fitValues: {
    type: Object,
    blackbox: true,
    label: 'The FIT-related object linked to this workout,' +
    'with different values and time in seconds.',
    optional: true,
  },
  speed: {
    type: Object,
    label: 'The speed object of this workout',
    optional: true,
  },
  power: {
    type: Object,
    label: 'The power object of this workout',
    optional: true,
  },
  cadence: {
    type: Object,
    label: 'The cadence object of this workout',
    optional: true,
  },
  ascent: {
    type: Number,
    label: 'The total ascent during this workout',
    optional: true,
    decimal: true,
  },
  descent: {
    type: Number,
    label: 'The total descent during this workout',
    optional: true,
    decimal: true,
  },
  calories: {
    type: Number,
    label: 'The calories consumed during this workout',
    optional: true,
  },
  stravaId: {
    type: Number,
    label: 'The Strava ID related to this workout',
    optional: true,
  },
});

export const workoutSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The id of the owner of this workout',
  },
  createdAt: {
    type: Date,
  },
  title: {
    type: String,
    label: 'The title of this workout',
  },
  description: {
    type: String,
    label: 'The description of this workout',
    optional: true,
  },
  startDate: {
    type: Date,
    label: 'The starting date of this workout',
  },
  duration: {
    type: Number,
    label: 'The duration in seconds of this workout',
  },
  distance: {
    type: Number,
    label: 'The distance in meters of this workout',
    decimal: true,
  },
  support: {
    type: String,
    label: 'The code of the support of this workout',
  },
  cr: {
    type: Object,
    label: 'The CR scales of this workout',
    blackbox: true,
    optional: true,
  },
  fitLinked: {
    type: Boolean,
    label: 'Wether there is a FIT file linked to this workout',
  },
  fitValues: {
    type: Object,
    blackbox: true,
    label: 'The FIT-related object linked to this workout,' +
    'with different values and time in seconds.',
    optional: true,
  },
  speed: {
    type: Object,
    label: 'The speed object of this workout',
    optional: true,
  },
  power: {
    type: Object,
    label: 'The power object of this workout',
    optional: true,
  },
  cadence: {
    type: Object,
    label: 'The cadence object of this workout',
    optional: true,
  },
  ascent: {
    type: Number,
    label: 'The total ascent during this workout',
    optional: true,
    decimal: true,
  },
  descent: {
    type: Number,
    label: 'The total descent during this workout',
    optional: true,
    decimal: true,
  },
  calories: {
    type: Number,
    label: 'The calories consumed during this workout',
    optional: true,
  },
  stravaId: {
    type: Number,
    label: 'The Strava ID related to this workout',
    optional: true,
  },
});


export const updateWorkoutSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  workout: {
    type: Object,
    label: 'The CR scales of this workout',
    blackbox: true,
    optional: true,
  },
});
