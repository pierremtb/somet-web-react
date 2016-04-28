import React from 'react';
import FabAthleteContentAdd from '../containers/fab-athlete-content-add.jsx';
import DashboardCards from '../containers/dashboard-cards.jsx';

export function TabDashboard(props) {
  return (
    <div className="tab-content">
      <DashboardCards params={props.params} />
      <FabAthleteContentAdd params={props.params} route={props.route} />
    </div>
  );
}

TabDashboard.propTypes = {
  params: React.PropTypes.object,
  route: React.PropTypes.object,
};
