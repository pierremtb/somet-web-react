import { composeWithTracker } from 'react-komposer';
import { PlansTable } from '../components/table-plan.jsx';
import { Loading } from '../components/loading.jsx';
import { Plans } from '../../api/plans/plans.js';

function composer(params, onReady) {
  const subscription = Meteor.subscribe('user-plans', this.location.pathname.split('/')[4]);
  if (subscription.ready()) {
    const plans = Plans.find().fetch();
    onReady(null, { plans });
  }
}

export default composeWithTracker(composer, Loading)(PlansTable);
