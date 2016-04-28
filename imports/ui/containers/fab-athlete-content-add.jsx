import { composeWithTracker } from 'react-komposer';
import { FabAthleteContentAdd } from '../components/fab-athlete-content-add.jsx';
import { Loading } from '../components/loading.jsx';
import { Groups } from '../../api/groups/groups.js';

function composer(props, onReady) {
  const subscription = Meteor.subscribe('this-group-name', props.params.group);
  if (subscription.ready()) {
    const group = Groups.findOne();
    let amITrainer = false;
    let amIAthlete = false;
    if (group.trainers.indexOf(Meteor.userId()) !== -1) {
      amITrainer = true;
    } else if (props.params.athlete === Meteor.user().username) {
      amIAthlete = true;
    }

    onReady(null, { amIAthlete, amITrainer });
  }
}

export default composeWithTracker(composer, Loading)(FabAthleteContentAdd);
