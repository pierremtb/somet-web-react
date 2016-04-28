import React from 'react';
import WorkoutsTable from '../containers/workouts-table.jsx';
import FabAthleteContentAdd from '../containers/fab-athlete-content-add.jsx';

export function TabWorkouts(props) {
  return (
    <div className="tab-content">
      <WorkoutsTable params={props.params} />
      <FabAthleteContentAdd params={props.params} route={props.route} />
    </div>
  );
}

TabWorkouts.propTypes = {
  params: React.PropTypes.object,
  route: React.PropTypes.route,
};
