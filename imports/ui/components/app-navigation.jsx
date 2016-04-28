import React from 'react';
import { AuthenticatedNavigation } from './authenticated-navigation.jsx';

export function AppNavigation(props) {
  function renderNavigation(isUser, myGroups) {
    return isUser ? <AuthenticatedNavigation list={myGroups} /> : null;
  }
  return <div> {renderNavigation(props.isUser, props.myGroups)}</div>;
}

AppNavigation.propTypes = {
  isUser: React.PropTypes.object,
  myGroups: React.PropTypes.array,
};
