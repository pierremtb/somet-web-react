import React from 'react';

export function TabCalendar() {
  return (
    <div className="tab-content">
      <h3>Calendrier</h3>
    </div>
  );
}

TabCalendar.propTypes = {
  params: React.PropTypes.object,
  route: React.PropTypes.object,
};
