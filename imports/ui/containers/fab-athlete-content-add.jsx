import { composeWithTracker } from 'react-komposer';
import { FabAthleteContentAdd } from '../components/fab-athlete-content-add.jsx';
import { Loading } from '../components/loading.jsx';
import { Groups } from '../../api/groups/groups.js';

function composer(props, onReady) {
  const name = props.params.group;
  const subscription = Meteor.subscribe('this-group-by-name', name);
  if (subscription.ready()) {
    const group = Groups.findOne({ name });
    console.log(group);
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
