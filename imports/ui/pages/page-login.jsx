import React from 'react';
import { handleAuthentication } from '../../modules/authentication';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { orange700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { sometLightTheme,
  accentColor, primaryDarkColor,
  loginCardStyle, loginTextFieldStyle } from '../tools/themes.js';

export class PageLogin extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSignupClick = this.onSignupClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLoginWithStravaClick = this.onLoginWithStravaClick.bind(this);

    this.state = {
      showSignup: false,
    };
  }

  onSignupClick() {
    if (this.state.showSignup) {
      handleAuthentication({ component: this }, true);
    } else {
      this.setState({ showSignup: true });
    }
  }

  onLoginClick() {
    if (this.state.showSignup) {
      this.setState({ showSignup: false });
    } else {
      handleAuthentication({ component: this }, false);
    }
  }

  onLoginWithStravaClick() {
    const options = {
      requestPermissions: ['email'],
      redirectUrl: '/home',
    };
    Meteor.loginWithStrava(options);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="center-align login-container">

        <img src="/somet-logo.png" id="somet_logo" alt="Logo de Somet" />
        <div className="actions">
          <RaisedButton
            data-social-login="loginWithStrava"
            label="Connexion avec Strava"
            className="full-width"
            onClick={this.onLoginWithStravaClick}
            backgroundColor={orange700}
            labelColor="#fff"
          />
        </div>
        <div className="actions">
          <div className="separate"></div>
        </div>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <MuiThemeProvider muiTheme={sometLightTheme}>
            <div className="forms_container">
              <Paper zDepth={2} style={loginCardStyle}>
                <div className="relative form_line">
                  <i className="material-icons">perm_identity</i>
                  <TextField
                    hintText="Nom d'utilisateur"
                    style={loginTextFieldStyle}
                    ref="formLogin"
                  />
                </div>
                <div className="relative form_line">
                  <i className="material-icons">fingerprint</i>
                  <TextField
                    hintText="Mot de passe"
                    type="password"
                    ref="formPassword"
                    style={loginTextFieldStyle}
                  />
                </div>
              </Paper>
              {this.state.showSignup ?
                <Paper
                  zDepth={2}
                  style={loginCardStyle}
                  className="space_top"
                >
                  <div className="relative form_line">
                    <i className="material-icons">email</i>
                    <TextField
                      hintText="Adresse email"
                      type="email"
                      ref="formEmail"
                      style={loginTextFieldStyle}
                    />
                  </div>
                  <div className="relative form_line">
                    <i className="material-icons">face</i>
                    <TextField
                      hintText="Nom complet"
                      ref="formFullName"
                      style={loginTextFieldStyle}
                    />
                  </div>
                </Paper> : null}
            </div>
          </MuiThemeProvider>
          <div className="actions" id="auth_actions">
            <RaisedButton
              label="Connexion par identifiants"
              className="full-width space_bottom"
              backgroundColor={this.state.showSignup ? primaryDarkColor : accentColor}
              labelColor="#fff"
              onClick={this.onLoginClick}
            />
            <RaisedButton
              label="Créer un compte"
              className="full-width"
              backgroundColor={!this.state.showSignup ? primaryDarkColor : accentColor}
              labelColor="#fff"
              onClick={this.onSignupClick}
            />
          </div>
        </form>
      </div>
    );
    /* return <Row>
     <Col xs={ 12 } sm={ 6 } md={ 4 }>
     <h4 className="page-header">Login</h4>
     <form ref="login" className="login" onSubmit={ this.handleSubmit }>
     <Input
     type="email"
     label="Email Address"
     ref="emailAddress"
     name="emailAddress"
     placeholder="Email Address"
     />
     <div className="form-group">
     <label htmlFor="password">
     <span className="pull-left">Password</span>
     <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
     </label>
     <input
     type="password"
     className="form-control"
     ref="password"
     name="password"
     placeholder="Password"
     />
     </div>
     <Button type="submit" bsStyle="success">Login</Button>
     </form>
     </Col>
     </Row>;*/
  }
}
