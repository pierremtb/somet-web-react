import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import reactMixin from 'react-mixin';
import { sometLightTheme,
  pageActionStyle, textFieldStyleDark, hintTextFieldStyleDark } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RegexTextField from '../components/regex-text-field.jsx';
import { Groups } from '../../api/groups/groups';

export class PageGroupEdit extends React.Component {
  constructor(props) {
    super(props);

    this.getMeteorData = this.getMeteorData.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getMeteorData() {
    const data = {};
    data.groups = [];
    const groupsSubscriptions = Meteor.subscribe('all-groups-names');
    if (groupsSubscriptions.ready()) {
      const groups = Groups.find().fetch();
      groups.map(g => {
        data.groups.push(g.name);
        return g;
      });
    }
    return data;
  }

  goBack() {
    const { group, athlete } = this.props.params;
    browserHistory.push(`/group/${group}/athlete/${athlete}/dashboard`);
  }

  render() {
    return (
      <div className="tab-content">
        <div>
          <FlatButton
            label="Retour"
            style={pageActionStyle}
            onClick={this.goBack}
            icon={<FontIcon className="material-icons">arrow_back</FontIcon>}
          />
          <FlatButton
            label="Enregistrer"
            style={pageActionStyle}
            icon={<FontIcon className="material-icons">save</FontIcon>}
          />
        </div>
        <div className="row">
          <div className="col s12">
            <RegexTextField
              hintText="Nom du groupe (ex: team-rocket)"
              inputStyle={textFieldStyleDark}
              style={textFieldStyleDark}
              hintStyle={hintTextFieldStyleDark}
              errorRegex="3-16 caractères. Lettres minuscules et '-'"
              errorUnavailable="Ce nom est déjà pris"
              regex={/^[a-z0-9-]{3,16}$/}
              unavailableValues={this.data.groups}
              fullWidth
            />
          </div>
        </div>

        <MuiThemeProvider muiTheme={sometLightTheme}>
          <div className="row space_top">
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

reactMixin(PageGroupEdit.prototype, ReactMeteorData);

PageGroupEdit.propTypes = {
  params: React.PropTypes.object,
};
