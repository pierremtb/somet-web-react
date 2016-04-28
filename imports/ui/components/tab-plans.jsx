import React from 'react';
import PlansTable from '../containers/plans-table.jsx';
import FabAthleteContentAdd from '../containers/fab-athlete-content-add.jsx';

export function TabPlans(props) {
  return (
    <div className="tab-content">
      <PlansTable params={props.params} />
      <FabAthleteContentAdd params={props.params} route={props.route} />
    </div>
  );
}

TabPlans.propTypes = {
  params: React.PropTypes.object,
  route: React.PropTypes.object,
};
