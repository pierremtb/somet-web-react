import React from 'react';
import { FontIcon } from 'material-ui/FontIcon';
import { white } from 'material-ui/styles/colors';

export function PageNotFound() {
  return (
    <div className="center">
      <FontIcon className="material-icons" color={white}>report_problem</FontIcon>
    </div>
  );
}
