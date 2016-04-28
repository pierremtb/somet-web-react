import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { sometLightTheme,
  pageActionStyle, textFieldStyleDark, hintTextFieldStyleDark } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

export function PageGroupEdit() {
  function goBack() {
    const url = `/group/${this.props.params.group}/athlete/${this.props.params.athlete}/dashboard`;
    browserHistory.push(url);
  }

  return (
    <div className="tab-content">
      <div>
        <FlatButton
          label="Retour"
          style={pageActionStyle}
          onClick={goBack}
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
          <TextField
            hintText="Nom du groupe (ex: team-rocket)"
            inputStyle={textFieldStyleDark}
            style={textFieldStyleDark}
            hintStyle={hintTextFieldStyleDark}
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
