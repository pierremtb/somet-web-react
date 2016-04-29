import { Workouts } from '../workouts';
import { check } from 'meteor/check';

Meteor.publish('usr-workouts', usr => {
  check(usr, String);
  const id = Meteor.users.findOne({ username: usr })._id;
  return Workouts.find({ owner: id });
});

Meteor.publish('this-workout', id => {
  check(id, String);
  return Workouts.find({ _id: id });
});

Meteor.publish('user-last-workout', usr => {
  check(usr, String);
  const id = Meteor.users.findOne({ username: usr })._id;
  return Workouts.find({ owner: id }, { sort: { startDate: -1 }, limit: 1 });
});

/* OLD

Meteor.publish('workoutsOfCurrentUser', function() {
  var wks = Workouts.find({owner: this.userId});
  return wks ? wks : this.ready();
});

Meteor.publish('workoutsOfUsr', function (usrId) {
  check(usrId, String);
  var wks = Workouts.find({owner: usrId}, {sort: {startDate: -1}});
  return wks ? wks : this.ready();
});

Meteor.publish('lastWorkoutOfUsrSync', function (usrId) {
  check(usrId, String);
  return Workouts.find({owner: usrId}, {sort: {startDate: -1}, limit: 1});
});


Meteor.publish('workoutOfThisId', function (id) {
  check(id, String);
  let owner = Workouts.findOne({_id: id}) ? Workouts.findOne({_id: id}).owner : false;
  let usr = Meteor.users.findOne(this.userId);
  if (owner == usr.username|| usr.profile.my_athletes.indexOf(owner) != -1) {
    var wk = Workouts.find({_id: id});
    return wk ? wk : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('thisTargetWorkoutsOfUsr', function (target, usr) {
  check(target, Object);
  check(usr, String);

  let start, end;

  if (target.year != -1 && target.month != -1) {
    start = new Date(target.year, target.month, 1);
    end = new Date(target.year, target.month + 1, 0);
  } else if (target.year != -1 && target.month == -1) {
    start = new Date(target.year, 0, 1);
    end = new Date(target.year + 1, 0, 0);
  } else {
    start = new Date(0);
    end = new Date(9999, 12, 31);
  }

  var wks = Workouts.find({
    owner: usr,
    startDate: {$gt: start, $lt: end}
  }, {sort: {startDate: 1}});

  return wks ? wks : this.ready();
});
*/
