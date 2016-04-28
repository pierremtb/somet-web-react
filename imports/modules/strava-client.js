export class StravaClient {
  constructor(accessToken) {
    this.token = accessToken;
    this.baseUrl = 'https://www.strava.com/api/v3/';
  }

  doGet(path, params = {}) {
    const headers = { Authorization: `Bearer ${this.token}` };
    const options = { headers, params };
    const res = Meteor.http.get(this.baseUrl + path, options);
    return res.data;
  }

  getActivities() {
    let res = [];
    const perPage = 100;

    for (let pageNum = 1; pageNum < 900; pageNum++) {
      const params = { per_page: perPage, page: pageNum };

      const pres = this.doGet('activities', params);

      // Strava seems to use an empty result to indicate end of pages
      if (pres.length < perPage) {
        break;
      } else {
        res = res.concat(pres);
      }
    }
    return res;
  }

  getActivitiesIds() {
    return this.getActivities().map(activity => activity.id);
  }

  getStreams(activityId, streamType) {
    const asArray = this.doGet(`activities/${activityId}/streams/${streamType}`);

    // The strava servers returns this as an array of datatypes, but
    // it is more useful to be a map
    const m = {};
    for (const s of asArray) {
      m[s.type] = s;
    }

    return m;
  }
}
