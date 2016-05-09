import { StravaClient } from '../../modules/strava-client';
import { Workouts } from '../../api/workouts/workouts';

function getUsers() {
  return Meteor.users.find().fetch();
}

function upsertStravaActivity(id, wk) {
  Workouts.upsert({ stravaId: id }, { $set: wk });
}

function fetchLastActivities(token, userId) {
  const Strava = new StravaClient(token);
  const activities = Strava.getActivities();
  activities.map(activity => {
    const startDate = new Date(activity.start_date_local);
    const createdAt = new Date;
    upsertStravaActivity(activity.id, {
      createdAt,
      startDate,
      owner: userId,
      title: activity.name,
      duration: activity.elapsed_time,
      distance: activity.distance,
      support: activity.type === 'Ride' ? 'mtb' : 'run',
      fitLinked: false,
      'speed.avg': activity.average_speed,
      'speed.max': activity.max_speed,
      ascent: activity.total_elevation_gain,
      calories: activity.calories,
      stravaId: activity.id,
    });
    return activity;
  });
}

Meteor.setInterval(() => {
  const users = getUsers();
  users.map(user => {
    if (user.services.strava) {
      fetchLastActivities(user.services.strava.accessToken, user._id);
    }
    return user;
  });
}, 60000);
