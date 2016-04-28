import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { fabStyle } from '../tools/themes.js';

export function FabAthleteContentAdd(props) {
  switch (props.route.path) {
    case 'dashboard': return props.amIAthlete || props.amITrainer ? (
      <FloatingActionButton
        style={fabStyle}
        secondary
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    ) : null;
    case 'workouts': return props.amIAthlete ? (
      <FloatingActionButton
        style={fabStyle}
        secondary
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    ) : null;
    case 'plans': return props.amITrainer ? (
      <FloatingActionButton
        style={fabStyle}
        secondary
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    ) : null;
    default: return null;
  }
}

FabAthleteContentAdd.propTypes = {
  amITrainer: React.PropTypes.bool,
  amIAthlete: React.PropTypes.bool,
  route: React.PropTypes.object,
};
