import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory } from 'react-router';
import { fabStyle } from '../tools/themes.js';

export function FabAthleteContentAdd(props) {
  function openAddPage(type) {
    const url = `/group/${props.params.group}/athlete/${props.params.athlete}/` +
      `${type}/new`;
    browserHistory.push(url);
  }

  switch (props.route.path) {
    case 'dashboard': return props.amIAthlete || props.amITrainer ? (
      <FloatingActionButton
        style={fabStyle}
        onTouchTap={() => openAddPage(props.amIAthlete ? 'workout' : 'plan')}
        secondary
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    ) : null;
    case 'workouts': return props.amIAthlete ? (
      <FloatingActionButton
        style={fabStyle}
        onTouchTap={() => openAddPage('workout')}
        secondary
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    ) : null;
    case 'plans': return props.amITrainer ? (
      <FloatingActionButton
        style={fabStyle}
        onTouchTap={() => openAddPage('plan')}
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
  params: React.PropTypes.object,
};
