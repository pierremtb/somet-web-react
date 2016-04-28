import { Plans } from '../plans';
import { check } from 'meteor/check';
import moment from 'moment';

Meteor.publish('user-plans', usr => {
  check(usr, String);
  const id = Meteor.users.findOne({ username: usr })._id;
  return Plans.find({ targetedUser: id });
});

Meteor.publish('this-plan', id => {
  check(id, String);
  return Plans.find({ _id: id });
});

Meteor.publish('user-plan-of-this-week', usr => {
  check(usr, String);
  const beforeMonday = moment().startOf('isoWeek').subtract(1, 'days').toDate();
  const afterMonday = moment().startOf('isoWeek').add(1, 'days').toDate();
  const id = Meteor.users.findOne({ username: usr })._id;
  return Plans.find({
    targetedUser: id,
    mondayDate: {
      $lt: afterMonday,
      $gt: beforeMonday,
    },
  });
});

/* OLD
Meteor.publish('planOfThisId', function (id) {
  check(id, String);
  let owner = Plans.findOne({_id: id}) ? Plans.findOne({_id: id}).owner : false,
    usr = Meteor.users.findOne(this.userId);
  if (owner == usr.username|| usr.profile.my_athletes.indexOf(owner) != -1) {
    var pl = Plans.find({_id: id});
    return pl ? pl : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('thisWeekPlansOfUsr', function (usr) {
  check(usr, String);
  var pl = Plans.find({owner: usr}, {sort: {mondayDate: -1}, limit: 1});
  return pl ? pl : this.ready();
});

Meteor.publish('plansOfCurrentUser', function() {
  var wks = Plans.find({owner: this.userId});
  return wks ? wks : this.ready();
});

Meteor.publish('user-plan-of-this-week', function (m) {
  return Plans.find({ targetedUsr: this.userId, mondayDate: m });
});
  */
