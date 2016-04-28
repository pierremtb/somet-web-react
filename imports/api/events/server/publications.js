// import { Events } from '../events';


/* OLD
Meteor.publish('eventOfThisId', function (id) {
  check(id, String);
  let owner = Events.findOne({_id: id}) ? Events.findOne({_id: id}).owner : false,
    usr = Meteor.users.findOne(this.userId);
  if (owner == usr.username|| usr.profile.my_athletes.indexOf(owner) != -1) {
    var ev = Events.find({_id: id});
    return ev ? ev : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('eventsOfUsr', function (usr) {
  check(usr, String);
  var evts = Events.find({owner: usr});
  return evts ? evts : this.ready();
});

Meteor.publish('upcomingEventsOfUsr', function (usr) {
  check(usr, String);
  var evts = Events.find({owner: usr, date: {$gte: moment().day("Monday").toDate()}});
  return evts ? evts : this.ready();
});

Meteor.publish('dayEventsOfUsr', function (usr, date) {
  check(usr, String);
  check(date, Date);
  var evts = Events.find({owner: usr, date: date});
  return evts ? evts : this.ready();
});

Meteor.publish('eventsOfCurrentUser', function() {
  var evts = Events.find({owner: this.userId});
  return evts ? evts : this.ready();
});
*/
