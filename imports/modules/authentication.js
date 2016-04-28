import 'jquery-validation';
import { browserHistory } from 'react-router';

let component;
let signup;

function handleLogin() {
  const username = component.refs.formLogin.input.value;
  const password = component.refs.formPassword.input.value;

  if (signup) {
    const profile = {
      fullName: component.refs.formFullName.input.value,
    };
    const user = {
      username,
      password,
      profile,
      email: component.refs.formEmail.input.value,
    };

    Accounts.createUser(user, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        browserHistory.push('/');
      }
    });
  } else {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        const { location } = component.props;
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  }
}

function validate() {
  /* $('.loginForm').validate({
   rules: {
   formLogin: {
   required: true
   },
   formPassword: {
   required: true,
   },
   formEmail: {
   required: signup,
   email: true,
   },
   formFullName: {
   required: signup,
   }
   },
   messages: {
   formEmail: {
   required: 'Need an email address here.',
   email: 'Is this email address legit?',
   },
   formLogin: {
   required: 'Need a login here.',
   },
   formFullName: {
   required: 'Need a name here.',
   },
   formPassword: {
   required: 'Need a password here.',
   },
   },
   submitHandler() { handleLogin(); },
   });*/
  handleLogin();
}

export function handleAuthentication(options, signupBool) {
  component = options.component;
  signup = signupBool;

  validate();
}
