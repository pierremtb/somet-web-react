import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const updatePassword = new ValidatedMethod({
  name: 'users.update.password',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run(id, pwd) {
    Accounts.setPassword(id, pwd, { logout: false });
  },
});

export const updateEmail = new ValidatedMethod({
  name: 'users.update.email',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run(id, m) {
    Accounts.addEmail(id, m, true);
  },
});

export const addThisGroup = new ValidatedMethod({
  name: 'users.add.group',
  validate: new SimpleSchema({
    userId: { type: SimpleSchema.RegEx.Id },
    groupId: { type: SimpleSchema.RegEx.Id },
  }).validator(),
  run(obj) {
    Meteor.users.update(obj.userId, { $addToSet: { 'profile.groups': obj.groupId } });
  },
});
