import { composeWithTracker } from 'react-komposer';
import { DashboardCards } from '../components/dashboard-cards.jsx';
import { Loading } from '../components/loading.jsx';
import { Plans } from '../../api/plans/plans.js';
import { Workouts } from '../../api/workouts/workouts.js';

function composer(props, onReady) {
  const usr = props.params.athlete;
  const workoutSub = Meteor.subscribe('user-last-workout', usr);
  const planSub = Meteor.subscribe('user-plan-of-this-week', usr);
  if (workoutSub.ready() && planSub.ready()) {
    const thisWeekPlan = Plans.findOne();
    const lastWorkout = Workouts.findOne();
    onReady(null, { thisWeekPlan, lastWorkout });
  }
}

export default composeWithTracker(composer, Loading)(DashboardCards);
