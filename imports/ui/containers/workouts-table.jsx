import { composeWithTracker } from 'react-komposer';
import { WorkoutsTable } from '../components/table-workouts.jsx';
import { Loading } from '../components/loading.jsx';
import { Workouts } from '../../api/workouts/workouts.js';

function composer(params, onReady) {
  const subscription = Meteor.subscribe('usr-workouts', this.location.pathname.split('/')[4]);
  if (subscription.ready()) {
    const workouts = Workouts.find().fetch();
    onReady(null, { workouts });
  }
}

export default composeWithTracker(composer, Loading)(WorkoutsTable);
