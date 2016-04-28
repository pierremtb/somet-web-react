import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';

export class PageAthlete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.route.path,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
    Session.set('selectedAthleteTabName', value);
    const url = `/group/${this.props.params.group}/athlete/${this.props.params.athlete}/${value}`;
    browserHistory.push(url);
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab
            label="dashboard"
            value="dashboard"
            route="dashboard"
          />
          <Tab
            label="Entrainements"
            value="workouts"
            route="workouts"
          />
          <Tab
            label="Plans"
            value="plans"
            route="plans"
          />
          <Tab
            label="Calendrier"
            value="calendar"
            route="calendar"
          />
          <Tab
            label="Analyse"
            value="analysis"
            route="analysis"
          />
        </Tabs>
        {this.props.children || 'Page athlete'}
      </div>
    );
  }
}

PageAthlete.propTypes = {
  children: React.PropTypes.element,
  params: React.PropTypes.object,
  route: React.PropTypes.route,
};
