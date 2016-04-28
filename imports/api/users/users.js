import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Schema = {};

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  groups: {
    type: Array,
  },
  'groups.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  profile: {
    type: Schema.UserProfile,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.helpers({});