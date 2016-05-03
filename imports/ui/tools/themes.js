import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import {
    white, darkBlack, transparent,
    blueGrey900, blueGrey800,
    pink500 } from 'material-ui/styles/colors';

export const accentColor = pink500;
export const primaryColor = blueGrey800;
export const primaryDarkColor = blueGrey900;

export const sometDarkTheme = getMuiTheme({
  color: 'white',
  palette: {
    leftIconColor: white,
    primary1Color: primaryColor,
    textColor: white,
    accent1Color: accentColor,
  },
  listItem: {
    nestedLevelDepth: 18,
    color: white,
    leftIconColor: fade(white, 0.9),
  },
  tabs: {
    backgroundColor: transparent,
    textColor: white,
  },
  datePicker: {
    color: white,
    textColor: white,
    calendarTextColor: darkBlack,
    selectColor: accentColor,
    calendarYearBackgroundColor: white,
  },
  textField: {
    textColor: white,
    focusColor: accentColor,
    hintColor: fade(white, 0.7),
  },
  toggle: {
    thumbOnColor: accentColor,
    thumbOffColor: fade(white, 0.5),
    trackOnColor: fade(accentColor, 0.5),
    trackOffColor: fade(white, 0.2),
  },
  checkbox: {
    boxColor: white,
    checkedColor: accentColor,
  },
});

export const sometLightTheme = getMuiTheme({
  palette: {
    leftIconColor: white,
    primary1Color: primaryColor,
    accent1Color: accentColor,
    textColor: darkBlack,
  },
  textField: {
    focusColor: accentColor,
  },
});

export const fabStyle = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
};

export const loginCardStyle = {
  padding: 16,
};

export const loginTextFieldStyle = {
  marginLeft: 20,
};

export const pageActionStyle = {
  color: '#FFF',
  marginRight: '1rem',
  marginBottom: '0rem',
};

export const datePickerFieldStyle = {
  color: 'white !default',
  fontSize: '2.5rem',
  fontWeight: '300',
  paddingBottom: '15px',
};

export const datePickerStyle = {
  display: 'inline-block',
  color: darkBlack,
};

export const textFieldStyleDark = {
  color: 'white',
  fontSize: '2.5rem',
  height: '4rem',
  fontWeight: '300',
  paddingBottom: '15px',
};

export const normalTextFieldStyleDark = {
  color: 'white',
};

export const hintTextFieldStyleDark = {
  color: 'rgba(255,255,255,0.7)',
  paddingBottom: '15px',
};

export const workoutCardTextStyle = {
  height: '15rem',
  overflowY: 'auto',
};

export const planCardTextStyle = {
  height: '9rem',
  overflowY: 'auto',
};
