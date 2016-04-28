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
