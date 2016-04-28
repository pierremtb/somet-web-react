const strava = Meteor.settings.private.oAuth.strava;

ServiceConfiguration.configurations.upsert(
  { service: 'strava' },
  { $set: strava }
);
